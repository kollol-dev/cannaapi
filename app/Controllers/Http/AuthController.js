'use strict'
const User = use('App/Models/User');
const Cannadrive = use('App/Models/Cannadrive');
const Cannago = use('App/Models/Cannago');
const Cannagrow = use('App/Models/Cannagrow');
const Dispensary = use('App/Models/Dispensary');
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
     // try {
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

      // } catch (error) {
      //   return response.status(401).json({
      //     'success': false,
      //     'message': 'You first need to login first!'
      //   })
      // }
    }
    async registerDrive({request, auth, response}) {
     // try {
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
      // } catch (error) {
      //   return response.status(401).json({
      //     'success': false,
      //     'message': 'You first need to login first!'
      //   })
      // }
       
    }
    async registerGrow({request, auth, response}) {
      
      //  try {
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

        // } catch (error) {
        //   return response.status(401).json({
        //     'success': false,
        //     'message': 'You first need to login first!'
        //   })
        // }
        
    }
    async registerDep({request, auth, response}) {

       // try {
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
        // } catch (error) {
        //   return response.status(401).json({
        //     'success': false,
        //     'message': 'You first need to login first!'
        //   })
       // }
        
        
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
            return response.status(200).json({
              'success': true,
              'message': 'Login Complete Successfully ! ',
              "user": user,
              'cannago': cannago ,
              "token": accessToken.token
            })
          }

        } catch (e) {
          return response.status(200).json({
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
            return response.status(200).json({
              'success': true,
              'message': 'Login Complete Successfully ! ',
              "user": user,
              'cannadrive': cannadrive ,
              "token": accessToken.token
            })
          }

        } catch (e) {
          return response.status(200).json({
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
            return response.status(200).json({
              'success': true,
              'message': 'Login Complete Successfully ! ',
              "user": user,
              'cannagrow': cannagrow ,
              "token": accessToken.token
            })
          }

        } catch (e) {
          return response.status(200).json({
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
          return response.status(200).json({
              'success': false,
              'message': e,
            })
        }
    }
    async getUser({request, auth, response}){

        try {
            return await auth.getUser()
          } catch (error) {
            response.send(error)
          }
    }
    async logout ({ auth, session }) {
      try {
        session.clear()
        await auth.logout()
        return
      } catch (e) {
        return false
      }
    }
}

module.exports = AuthController
