'use strict'
const User = use('App/Models/User');
const Cannagrow = use('App/Models/Cannagrow');
const Item = use('App/Models/Item');
const ItemTag = use('App/Models/ItemTag');
class CannaGrowController {
    async edit({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let grower = await Cannagrow.findBy('userId', user.id)
              data.growId = grower.id
            //   let tags = data.tags
            //   delete data.tags
            data.tags = JSON.stringify(data.tags)
            let item =await Item.create(data)

              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !',
                  "item": item
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
    async indexItem({request,response,auth}){
        //  try {
            //  let user =  await auth.getUser()
              let allItems =await Item.query().where('userId',user.id).fetch()
              return response.status(200).json({
                  'success': true,
                  "allItems": allItems
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
    async showItem({request,response,auth,params}){
        //  try {
              let item =await Item.query().where('id',params.id).fetch()
              return response.status(200).json({
                  'success': true,
                  "item": item
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
    async storeItem({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              data.growId = user.id
              let tags = data.tags
              delete data.tags
              let item =await Item.create(data)
              let allTags = []
              for(let d of tags){
                let tag = {
                    itemId: item.id,
                    keyword: d
                }
                allTags.push(tag)
              }
              await ItemTag.createMany(allTags);
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !',
                  "item": item
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
    async editItem ({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              if(data.userId != user.id){
                return response.status(401).json({
                    'success': false,
                    'message': 'You are not authenticated user!'
                })
              }
              let tags = data.tags
              delete data.tags
              let item =await Item.query().where('id',data.id).update(data)
              await ItemTag.query().where('itemId',data.id).delete()
              let allTags = []
              for(let d of tags){
                let tag = {
                    itemId: item.id,
                    keyword: d
                }
                allTags.push(tag)
              }
              await ItemTag.createMany(allTags);
              return response.status(200).json({
                  'success': true,
                  'message': 'response edited successfully !',
                  "item": item
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
}

module.exports = CannaGrowController
