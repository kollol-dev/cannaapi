'use strict'
const Noti = use('App/Models/Noti');
class NotificationController {

    async getUnseenNoti({request,response,auth}){
        let user =  await auth.getUser()
       
        let noti =  await Noti.query().where('user_id',user.id).where('seen', 0).count('id as count').first();
        return response.status(200).json({
            'success': true,
            "notification": noti
          })
    }
    async getUnseenNotiDetails({request,response,auth}){
        let user =  await auth.getUser()
       
        let noti =  await Noti.query().where('user_id',user.id).limit(10).fetch();
        return response.status(200).json({
            'success': true,
            "notification": noti
          })
    }
    async updateNoti({request,response,auth}){
        let user =  await auth.getUser()
       
        await Noti.query().where('user_id',user.id).update({
            seen:1
        });
        return response.status(200).json({
            'success': true,
            "message": 'Notification Updated!'
          })
    }


}

module.exports = NotificationController
