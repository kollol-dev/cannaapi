'use strict'
const Noti = use('App/Models/Noti');
class NotificationController {

    async getUnseenNoti({ request, response, auth }) {
        let user = await auth.getUser()

        if (user.userType == 2) {
            // let noti = Noti.query()
            //     .where('user_id', user.id)

            // let array = await noti.whereRaw('isAll = ? and notiType = ? and seen = ?', [1, 'driver', 0]).fetch()
            
            // return array[0]
            let noti = await Noti.query().where('user_id', user.id).andWhere('seen', 0).orWhere('isAll', 1).andwhere('notiType', 'driver').andWhere('seen', 0).fetch();
            // let noti = await Noti.query().where('user_id', user.id).orWhere('isAll', 1).where('notiType', 'driver').andWhere('seen', 0).count('id as count').first();
            return response.status(200).json({
                'success': true,
                "notification": noti
            })
        }

        let noti = await Noti.query().where('user_id', user.id).where('seen', 0).count('id as count').first();
        return response.status(200).json({
            'success': true,
            "notification": noti
        })
    }
    async getUnseenNotiDetails({ request, response, auth }) {
        let user = await auth.getUser()

        if (user.userType == 2) {
            let noti = await Noti.query().where('user_id', user.id).orWhere('isAll', 1).where('notiType', 'driver').limit(10).orderBy('id', 'desc').fetch();
            return response.status(200).json({
                'success': true,
                "notification": noti
            })
        }

        let noti = await Noti.query().where('user_id', user.id).limit(10).orderBy('id', 'desc').fetch();
        return response.status(200).json({
            'success': true,
            "notification": noti
        })


    }
    async updateNoti({ request, response, auth }) {
        let user = await auth.getUser()

        await Noti.query().where('user_id', user.id).update({
            seen: 1
        });

        if(user.userType == 2){
            await Noti.query().where('notiType', 'driver').update({
                seen: 1
            })
        }

        return response.status(200).json({
            'success': true,
            "message": 'Notification Updated!'
        })
    }


}

module.exports = NotificationController
