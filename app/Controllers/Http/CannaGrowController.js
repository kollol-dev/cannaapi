'use strict'
const User = use('App/Models/User');
const Cannagrow = use('App/Models/Cannagrow');
const Item = use('App/Models/Item');
const ItemTag = use('App/Models/ItemTag');
const Database = use('Database')
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
              let user =  await auth.getUser()
            let allItems =await Item.query().where('userId',user.id).with('tags').with('reviews').fetch()
              
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
    async indexItemAll({request,response,auth}){
        //  try {
            //  let user =  await auth.getUser()
            

              let sortType = request.input('sortType') ? request.input('sortType') : ''
              let price1 = request.input('price1') ? request.input('price1') : ''
              let price2 = request.input('price2') ? request.input('price2') : ''
              let key = request.input('key') ? request.input('key') : ''

              let rawData = Item.query().with('tags').with('store').with('user').with('reviews')
              if(price1 && price2){
                console.log("this is ok")
                rawData.where('price', '>=', price1)
                rawData.where('price', '<=', price2)
                
              }
              if(key){
                  rawData.whereHas('tags', (builder) => {
                    builder.where('keyword', 'like', '%'+key+'%')
                  })
              }
              if(sortType){
                if(sortType == 'Alphabetical'){
                  rawData.orderBy('name', 'asc')
                }
              }
              let allItems = await rawData.fetch()
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
              let item =await Item.query().where('id',params.id).with('tags').with('store').with('user').with('reviews')
              .with('avgRating')
              .first()
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
    async growHome ({request,response,auth,params}){
        //  try {
              let totalsales = await User.query().where('id' , params.id).with('totalsales').first()
              let grower = await Cannagrow.query().where('userId',params.id).first()
              const mostPopular = await Database.raw('SELECT items.* , cast(AVG(item_reviews.rating) as decimal(10,2)) AS averageRating FROM items LEFT JOIN item_reviews ON items.id = item_reviews.itemId WHERE items.growId = ? GROUP BY items.id ORDER by averageRating desc limit 3 ', [grower.id])
              const leastPopular = await Database.raw('SELECT items.* , cast(AVG(item_reviews.rating) as decimal(10,2)) AS averageRating FROM items LEFT JOIN item_reviews ON items.id = item_reviews.itemId WHERE items.growId = ? GROUP BY items.id ORDER by averageRating ASC limit 3 ', [grower.id])
              return response.status(200).json({
                  'success': true,
                  'message': 'request data recived successfully !', 
                  "item": totalsales,
                  "mostPopular": mostPopular[0],
                  "leastPopular": leastPopular[0]
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async destroyItem({request,response,auth}){
      //  try {
            let data = request.all()
            let user =  await auth.getUser()
            await Item.query().where('id',data.id).delete()
            return response.status(200).json({
                'success': true,
                'message': 'response deleted successfully !',
              })
        //   } catch (error) {
        //     return response.status(401).json({
        //         'success': false,
        //         'message': 'You first need to login first!'
        //     })
        //   }

  }
    async vendorlist ({request,response,auth,params}){
        //  try {
              let growerlist = await Cannagrow.query().with('user').fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'request data recived successfully !', 
                  "growerlist": growerlist,
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
}

module.exports = CannaGrowController;
