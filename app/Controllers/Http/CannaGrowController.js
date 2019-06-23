'use strict'

class CannaGrowController {
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
    async storeItem({request,response,auth}){
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
}

module.exports = CannaGrowController
