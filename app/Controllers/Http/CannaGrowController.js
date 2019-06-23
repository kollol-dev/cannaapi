'use strict'
const User = use('App/Models/User');
const Cannagrow = use('App/Models/Cannagrow');
const Item = use('App/Models/Item');
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
    async storeItem({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id

              data.growId = user.id
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
}

module.exports = CannaGrowController
