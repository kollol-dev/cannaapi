'use strict'
const Questionnaire = use('App/Models/Questionnaire');
class CannaGoController {
    async storeQuestionnaire(){
        let data = request.all()
        let user
        try {
            user =  await auth.getUser()
            data.userId = user.id
            let questionnaire =await Questionnaire.create(data)
            return response.status(200).json({
                'success': true,
                'message': 'response stored successfully !',
                "questionnaire": questionnaire
              })



          } catch (error) {
            return response.status(401).json({
                'success': false,
                'message': 'You first need to login first!'
            })
          }

    }
}

module.exports = CannaGoController
