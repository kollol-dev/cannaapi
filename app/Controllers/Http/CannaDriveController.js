'use strict'
const Cannadrive = use('App/Models/Cannadrive');
const DriverReview = use('App/Models/DriverReview');
class CannaDriveController {
    async edit({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let questionnaire =await Questionnaire.create(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !',
                  "questionnaire": questionnaire
                })
  
  
  
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!' 
          //     })
          //   }
  
      }
          async indexSingleDriver({params,response,auth}){
      //  try {
          //  let user =  await auth.getUser()
          let allItems =await Cannadrive.query().where('id',params.id).with('user').fetch()
            
            return response.status(200).json({
                'success': true,
                "driver": allItems
              })
        //   } catch (error) {
        //     return response.status(401).json({
        //         'success': false,
        //         'message': 'You first need to login first!'
        //     })
        //   }

    }
    //   async driverHome ({request,response,auth,params}){
    //     //  try {
    //         let user =  await auth.getUser()
    //           let totalsales = await User.query().where('id' , user.id).with('drivertotalsales').first()

    //           let grower = await Cannagrow.query().where('userId',params.id).first()
    //           const mostPopular = await Database.raw('SELECT items.* , cast(AVG(item_reviews.rating) as decimal(10,2)) AS averageRating FROM items LEFT JOIN item_reviews ON items.id = item_reviews.itemId WHERE items.growId = ? GROUP BY items.id ORDER by averageRating desc limit 3 ', [grower.id])
    //           const leastPopular = await Database.raw('SELECT items.* , cast(AVG(item_reviews.rating) as decimal(10,2)) AS averageRating FROM items LEFT JOIN item_reviews ON items.id = item_reviews.itemId WHERE items.growId = ? GROUP BY items.id ORDER by averageRating ASC limit 3 ', [grower.id])
    //           return response.status(200).json({
    //               'success': true,
    //               'message': 'request data recived successfully !', 
    //               "item": totalsales,
    //               "mostPopular": mostPopular[0],
    //               "leastPopular": leastPopular[0]
    //             })
    //       //   } catch (error) {
    //       //     return response.status(401).json({
    //       //         'success': false,
    //       //         'message': 'You first need to login first!'
    //       //     })
    //       //   }
  
    // }

    async showDriverReview({request,response,auth,params}){
        //  try {
              let driverreview =await DriverReview.query().where('driverId',params.id).with('driver').with('user').fetch()
              return response.status(200).json({
                  'success': true,
                  "driverreview": driverreview
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async storeDriverReview({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
  
              let driverreview = await DriverReview.create(data)
              
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !',
                  "driverreview": driverreview
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
    async editDriverReview ({request,response,auth}){
        //  try {
          let data = request.all()
          let user =  await auth.getUser()
          if(data.userId == user.id){
              return response.status(401).json({
                    'success': false,
                    'message': 'You are not authenticated user'
                  })
          }
          let driverreview = await DriverReview.query().where('id',data.id).update(data)
          
          return response.status(200).json({
              'success': true,
              'message': 'response updated successfully !',
              "driverreview": driverreview
            })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async destroyDriverReview ({request,response,auth}){
        //  try {
          let data = request.all()
          let user =  await auth.getUser()
  
          if(data.userId == user.id){
            return response.status(401).json({
                  'success': false,
                  'message': 'You are not authenticated user'
                })
        }
        await DriverReview.query().where('id',data.id).delete()
          
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
}

module.exports = CannaDriveController
