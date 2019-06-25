'use strict'
const DriverReport = use('App/Models/DriverReport');
const UserReport = use('App/Models/UserReport');
const GrowerReport = use('App/Models/GrowerReport');
class ReportController {

    async indexUserrReport({response,auth}){
        //  try {
              let user =  await auth.getUser()
              let userReport = await UserReport.query().where('userId',user.id)
              .with('order')
              .with('order.orderdetails')
              .with('order.orderdetails.item')
              .fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async showUserrReport({request,response,auth,params}){
        //  try {
              let user =  await auth.getUser()
              
              let userReport = await UserReport.query().where('id',params.id)
              .with('order')
              .with('order.orderdetails')
              .with('order.orderdetails.item')
              .first()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async storeUserrReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let userReport =await UserReport.create(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async editUserrReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              if(data.userId != user.id){
                return response.status(401).json({
                          'success': false,
                          'message': 'You are not authenticated user!'
                      })
              }
              await UserReport.query().where('id',data.id).update(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response edited successfully !', 
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async destroyUserrReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              await UserReport.query().where('id',data.id).delete()
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



    async indexDriverReport({response,auth}){
        //  try {
              let user =  await auth.getUser()
              let userReport = await DriverReport.query().where('userId',user.id)
              .with('order')
              .with('order.orderdetails')
              .with('order.orderdetails.item')
              .fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async showDriverReport({request,response,auth,params}){
        //  try {
              let user =  await auth.getUser()
              
              let userReport = await DriverReport.query().where('id',params.id)
              .with('order')
              .with('order.orderdetails')
              .with('order.orderdetails.item')
              .first()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async storeDriverReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let userReport =await DriverReport.create(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async editDriverReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              if(data.userId != user.id){
                return response.status(401).json({
                          'success': false,
                          'message': 'You are not authenticated user!'
                      })
              }
              await DriverReport.query().where('id',data.id).update(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response edited successfully !', 
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async destroyDriverReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              await DriverReport.query().where('id',data.id).delete()
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



    async indexGrowerReport({response,auth}){
        //  try {
              let user =  await auth.getUser()
              let userReport = await GrowerReport.query().where('userId',user.id)
              .with('order')
              .with('order.orderdetails')
              .with('order.orderdetails.item')
              .fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async showGrowerReport({request,response,auth,params}){
        //  try {
              let user =  await auth.getUser()
              
              let userReport = await GrowerReport.query().where('id',params.id)
              .with('order')
              .with('order.orderdetails')
              .with('order.orderdetails.item')
              .first()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async storeGrowerReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let userReport =await GrowerReport.create(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !', 
                  "userReport": userReport
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async editGrowerReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              if(data.userId != user.id){
                return response.status(401).json({
                          'success': false,
                          'message': 'You are not authenticated user!'
                      })
              }
              await GrowerReport.query().where('id',data.id).update(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response edited successfully !', 
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async destroyGrowerReport({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              await GrowerReport.query().where('id',data.id).delete()
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


module.exports = ReportController
