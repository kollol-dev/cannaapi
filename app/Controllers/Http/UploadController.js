'use strict'

const fs = require('fs');
const Helpers = use("Helpers");
class UploadController {

    async uploadImage({ request, response }) {

        let data = request.all()
        console.log('data', data)

        let base64Image = data.image.split(';base64,').pop();

       
        // const uploadImage = request.file("file", {
        //     types: ["png", "jpg", "jpeg"],
        //     size: "2mb"
        // });
        // const name = `${new Date().getTime()}` + "." + uploadImage.subtype;
        const name = `${new Date().getTime()}` + ".png"
        const path = `./public/uploads/${name}`
        await fs.writeFile(path, base64Image, {encoding: 'base64'}, function(err) {
            console.log('File created');

            if(err){
                return response.status(413).json({
                    success: false,
                    message: 'Image size is too large!'
                })
            }
        });
        

        // console.log('buffer', buff)
        console.log('Base64 image data converted to file: ' + name);


        // await uploadImage.move(Helpers.publicPath("uploads"), {
        //     name: name
        // });
        // if (!uploadImage.moved()) {
        //     return uploadImage.error();
        // }

        return response.status(200).json({
            success: true,
            message: "Image has been uploaded successfully!",
            image_path: `/uploads/${name}`
        });
    }


    getFilesizeInBytes(filename) {
        var stats = fs.statSync(filename)
        var fileSizeInBytes = stats["size"]
        return fileSizeInBytes
    }
}

module.exports = UploadController
