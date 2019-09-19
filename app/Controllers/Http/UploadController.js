'use strict'

const fs = require('fs');
const Helpers = use("Helpers");
class UploadController {

    async uploadImage({ request, response }) {

        let data = request.all()
        console.log('data', data)


       
        // const uploadImage = request.file("file", {
        //     types: ["png", "jpg", "jpeg"],
        //     size: "2mb"
        // });
        // const name = `${new Date().getTime()}` + "." + uploadImage.subtype;
        const name = `${new Date().getTime()}` + ".png"

        let buff = new Buffer(data.image, 'base64');
        let file = fs.writeFileSync(name, buff);

        console.log('file', file)
        console.log('Base64 image data converted to file: ' + name);


        await uploadImage.move(Helpers.publicPath("uploads"), {
            name: name
        });
        if (!uploadImage.moved()) {
            return uploadImage.error();
        }

        return response.status(200).json({
            message: "Image has been uploaded successfully!",
            image_path: `/uploads/${name}`
        });
    }
}

module.exports = UploadController
