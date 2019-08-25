'use strict'
const User = use('App/Models/User');
const Cannadrive = use('App/Models/Cannadrive');
const Cannago = use('App/Models/Cannago');
const Cannagrow = use('App/Models/Cannagrow');
const Dispensary = use('App/Models/Dispensary');
const Hash = use('Hash')
const suid = require('rand-token').suid;
class AuthController {
    async test(){
        return 'dfsdfsdfsfsd'
    }
    async register({request, auth, response}) {
      const data = request.all()

        let user = await User.create(request.all())
        let accessToken = await auth.generate(user)
        return response.status(200).json({
          'success': true,
          'message': 'Registration Successfull please complete second step',
          "user": user,
          "token": accessToken.token
        })
    }
    async registerGo({request, auth, response}) {
      try {
        const data = request.all()
        let user = await auth.getUser()
        await User.query().where('id',user.id).update({'userType':1})
        if(data.userId != user.id){
          return response.status(401).json({
                'success': false,
                'message': 'You are not authenticated user'
              })
        }
        let cannago = await Cannago.create(request.all())
        let accessToken = await auth.generate(user)
        return response.status(200).json({
          'success': true,
          'message': 'Registration fully Completed ! ',
          "user": user,
          'cannago': cannago ,
          "token": accessToken.token
        })

      } catch (error) {
        return response.status(401).json({
          'success': false,
          'message': 'You first need to login first!'
        })
      }
    }
    async registerDrive({request, auth, response}) {
     try {
        const data = request.all()
        let user = await auth.getUser()
        await User.query().where('id',user.id).update({'userType':2})
        if(data.userId != user.id){
          return response.status(401).json({
                'success': false,
                'message': 'You are not authenticated user'
              })
        }
        let cannadrive = await Cannadrive.create(request.all())
        let accessToken = await auth.generate(user)
        return response.status(200).json({
          'success': true,
          'message': 'Registration fully Completed ! ',
          "user": user,
          'cannadrive': cannadrive ,
          "token": accessToken.token
        })
      } catch (error) {
        return response.status(401).json({
          'success': false,
          'message': 'You first need to login first!'
        })
      }
       
    }
    async registerGrow({request, auth, response}) {
      
        try {
          const data = request.all()
          let user = await auth.getUser()
          await User.query().where('id',user.id).update({'userType':3})
          if(data.userId != user.id){
            return response.status(401).json({
                  'success': false,
                  'message': 'You are not authenticated user'
                })
          }
          data.growerType = 1
          let cannagrow = await Cannagrow.create(request.all())
          let accessToken = await auth.generate(user)
          return response.status(200).json({
            'success': true,
            'message': 'Registration fully Completed ! ',
            "user": user,
            'cannagrow': cannagrow ,
            "token": accessToken.token
          })

        } catch (error) {
          return response.status(401).json({
            'success': false,
            'message': 'You first need to login first!'
          })
        }
        
    }
    async registerDep({request, auth, response}) {

        try {
          const data = request.all()
          let user = await auth.getUser()
          await User.query().where('id',user.id).update({'userType':3})
          if(data.userId != user.id){
            return response.status(401).json({
                  'success': false,
                  'message': 'You are not authenticated user'
                })
          }
          data.growerType = 2
          let dispensary = await Cannagrow.create(request.all())
          let accessToken = await auth.generate(user)
          return response.status(200).json({
            'success': true,
            'message': 'Registration fully Completed ! ',
            "user": user,
            'dispensary': dispensary ,
            "token": accessToken.token
          })
        } catch (error) {
          return response.status(401).json({
            'success': false,
            'message': 'You first need to login first!'
          })
       }
        
        
    }


    async loginTest({request, auth, response}) {
       // await auth.listTokens()
        const email = request.input("email")
        const password = request.input("password");
        console.log('email is', password)
        //return await auth.attempt(email, password)
        if (await auth.attempt(email, password)) {
          let user = await User.findBy('email', email)
          let accessToken = await auth.generate(user)
          return response.json({"user":user,"token": accessToken.token})
         
        }
    }
    async loginGo({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email) 
            let accessToken = await auth.generate(user)
            let cannago = await Cannago.query().where('userId', user.id ).first()

            if(user.userType != 1){
              return response.json({
                'success':false,
                'messeage': 'You are not a buyer!'
              })
            }
            return response.status(200).json({
              'success': true,
              'message': 'Login Complete Successfully ! ',
              "user": user,
              'cannago': cannago ,
              "token": accessToken.token
            })
          }

        } catch (e) {
          return response.json({
            'success': false,
            'message': e,
          })
        }
    }
    async loginDrive({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            let cannadrive = await Cannadrive.query().where('userId', user.id ).first()
            if(user.userType != 2){
              return response.json({
                'success':false,
                'messeage': 'You are not a driver!'
              })
            }
            return response.status(200).json({
              'success': true,
              'message': 'Login Complete Successfully ! ',
              "user": user,
              'cannadrive': cannadrive ,
              "token": accessToken.token
            })
          }

        } catch (e) {
          return response.json({
            'success': false,
            'message': e,
          })
        }
    }
    async loginGrow({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");

        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            let cannagrow = await Cannagrow.query().where('userId', user.id ).first()
            
           // cannagrow = JSON.parse(JSON.stringify(cannagrow))
            if(user.userType != 3){
              return response.json({
                'success':false,
                'messeage': 'You are not a Seller!'
              })
            }
            return response.status(200).json({
              'success': true,
              'message': 'Login Complete Successfully ! ',
              "user": user,
              'cannagrow': cannagrow ,
              "token": accessToken.token
            })
          }

        } catch (e) {
          console.log(e)
          return response.json({
            'success': false,
            'message': e,
          })
        }
    }
    async loginDep({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            let dispensary = await Dispensary.query().where('userId', user.id ).first()
            return response.status(200).json({
              'success': true,
              'message': 'Login Complete Successfully ! ',
              "user": user,
              'dispensary': dispensary ,
              "token": accessToken.token
            })
          }

        } catch (e) {
          return response.json({
              'success': false,
              'message': e,
            })
        }
    }
    async editUser({request,response,auth}){
      //  try {
            let data = request.all()
            let user =  await auth.getUser()
          //  data.userId = user.id
            let cannago =await User.query().where('id',data.id).update(data)
            return response.status(200).json({
                'success': true,
                'message': 'response Updated successfully !',
                'user': data
              })
        //   } catch (error) {
        //     return response.status(401).json({
        //         'success': false,
        //         'message': 'You first need to login first!'
        //     })
        //   }

    }
    async getUser({request, auth, response}){

        try {
            return await auth.getUser()
          } catch (error) {
            response.send(error)
          }
    }
    async logout ({ auth, session , response }) {

      try {
        session.clear()
        //await auth.logout()

        return response.status(200).json({
              'success': true,
              'message': 'Logout Successfull ! ',
            })
      } catch (e) {
        return response.json({
              'success': false,
              'message': e,
            })
      }
    }
      // password Reset
  async sendResetCodeEmail ({ request, response }) {
    let email = request.all().email
    const check = await User.query().where('email', email).getCount()
    // eslint-disable-next-line eqeqeq
    if (check == 0) {
      return response.status(200).json({
        'success': false,
        'message': "404 Email doesn't exist!."
      })
    }
    let token = suid(6)
    let data = {
      token: token
    }
    console.log(data)
    // await Mail.send('emails.forgotpassword', data, (message) => {
    //   message
    //     .to(email)
    //     .from('Support@worldtradebuddy.com', 'Support @ WorldTradeBuddy')
    //     .subject('Reset Password')
    // })
    await User.query().where('email', email).update({ 'passwordToken': token })
    return response.status(200).json({
      'success': true,
      'message': "A varification code send to your email address!",
      'token':token
    })
  }

  async checkPasswordResetCode ({ request, response }) {
    let data = request.all()
    const check = await User.query().where('passwordToken', data.token).getCount()
    if (check == 0) {
      return response.status(200).json({
        'success': false,
        'message': "404 Code doesn't exist!."
      })
    }
    return response.status(200).json({
      'success': true,
      
      'token':data.token
    })
}

  async resetForgotPassword({ request, response }) {
    let data = request.all()
    let password = await Hash.make(data.password)
    let check = await User.query().where('passwordToken', data.token).update({password: password, passwordToken: null})
    return response.status(200).json({
      'success': true,
      'message': "Password Reset !",
      'check':check
    })
}


  // Reset Password 

  async resetPassword({ request, response , auth }) {
    let data = request.all()
    let user =  await auth.getUser()
   // let password = await Hash.make(data.password)
    let check = await User.query().where('password', data.oldPassword).where('id',user.id).update({password: data.password})
    return response.status(200).json({
      'success': true,
      'message': "Password Reset !",
      'check':check
    })
}
}

module.exports = AuthController
