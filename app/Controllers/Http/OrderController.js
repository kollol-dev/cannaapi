'use strict'
const Cannagrow = use('App/Models/Cannagrow');
const Curt = use('App/Models/Curt');
class OrderController {
    async storeCurt({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id

              let curt =await Curt.create(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !',
                  "curt": curt
                })
  
  
  
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }

}

module.exports = OrderController
