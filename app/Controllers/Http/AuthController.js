'use strict'
const User = use('App/Models/User');
class AuthController {
    async test(){
        return 'dfsdfsdfsfsd'
    }
    async register({request, auth, response}) {
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        let user = await User.create(request.all())
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
    }
    async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            return response.json({"user":user, "token": accessToken.token})
          }

        }
        catch (e) {
          return response.json({message: 'You first need to register!'})
        }
    }
    async getUser({request, auth, response}){

        try {
            return await auth.getUser()
          } catch (error) {
            response.send(error)
          }
    }
}

module.exports = AuthController
