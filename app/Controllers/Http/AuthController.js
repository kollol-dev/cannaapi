'use strict'
const User = use('App/Models/User');
const Cannadrive = use('App/Models/Cannadrive');
const Cannago = use('App/Models/Cannago');
const Cannagrow = use('App/Models/Cannagrow');
const Dispensary = use('App/Models/Dispensary');
const Order = use('App/Models/Order');
const Hash = use('Hash')
const suid = require('rand-token').suid;
const Database = use('Database')
class AuthController {
  async test() {
    return 'dfsdfsdfsfsd'
  }
  async register({ request, auth, response }) {
    const data = request.all()

    // for buyer and driver profile picture
    if (data.userType == 1 || data.userType == 2) {
      data.img = `/uploads/1570001800812.png`
    } // for seller profile picture
    else {
      data.img = `/uploads/1570001964365.png`
    }
    let user = await User.create(data)
    let accessToken = await auth.generate(user)
    return response.status(200).json({
      'success': true,
      'message': 'Registration Successfull please complete second step',
      "user": user,
      "token": accessToken.token
    })
  }
  async registerGo({ request, auth, response }) {
    try {
      const data = request.all()
      let user = await auth.getUser()
      await User.query().where('id', user.id).update({ 'userType': 1 })
      if (data.userId != user.id) {
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
        'cannago': cannago,
        "token": accessToken.token
      })

    } catch (error) {
      return response.status(401).json({
        'success': false,
        'message': 'You first need to login first!'
      })
    }
  }
  async registerDrive({ request, auth, response }) {
    try {
      const data = request.all()
      let user = await auth.getUser()
      await User.query().where('id', user.id).update({ 'userType': 2 })
      if (data.userId != user.id) {
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
        'cannadrive': cannadrive,
        "token": accessToken.token
      })
    } catch (error) {
      return response.status(401).json({
        'success': false,
        'message': 'You first need to login first!'
      })
    }

  }
  async registerGrow({ request, auth, response }) {

    try {
      const data = request.all()
      let user = await auth.getUser()
      await User.query().where('id', user.id).update({ 'userType': 3 })
      if (data.userId != user.id) {
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
        'cannagrow': cannagrow,
        "token": accessToken.token
      })

    } catch (error) {
      return response.status(401).json({
        'success': false,
        'message': 'You first need to login first!'
      })
    }

  }
  async registerDep({ request, auth, response }) {

    try {
      const data = request.all()
      let user = await auth.getUser()
      await User.query().where('id', user.id).update({ 'userType': 3 })
      if (data.userId != user.id) {
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
        'dispensary': dispensary,
        "token": accessToken.token
      })
    } catch (error) {
      return response.status(401).json({
        'success': false,
        'message': 'You first need to login first!'
      })
    }


  }


  async loginTest({ request, auth, response }) {
    // await auth.listTokens()
    const email = request.input("email")
    const password = request.input("password");
    console.log('email is', password)
    //return await auth.attempt(email, password)
    if (await auth.attempt(email, password)) {
      let user = await User.findBy('email', email)
      let accessToken = await auth.generate(user)
      return response.json({ "user": user, "token": accessToken.token })

    }
  }


  async loginGo({ request, auth, response }) {
    const email = request.input("email")
    const password = request.input("password");
    const app_token = request.input('app_token')
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        let cannago = await Cannago.query().where('userId', user.id).first()

        if (user.userType != 1) {
          return response.json({
            'success': false,
            'messeage': 'You are not a buyer!'
          })
        }

        await User.query().where('id', user.id).update({
          "app_Token": app_token
        })
        return response.status(200).json({
          'success': true,
          'message': 'Login Complete Successfully ! ',
          "user": user,
          'cannago': cannago,
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
  async loginDrive({ request, auth, response }) {
    const email = request.input("email")
    const password = request.input("password");
    const app_token = request.input('app_token')
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        let cannadrive = await Cannadrive.query().where('userId', user.id).first()
        if (user.userType != 2) {
          return response.json({
            'success': false,
            'messeage': 'You are not a driver!'
          })
        }
        await User.query().where('id', user.id).update({
          "app_Token": app_token
        })
        return response.status(200).json({
          'success': true,
          'message': 'Login Complete Successfully ! ',
          "user": user,
          'cannadrive': cannadrive,
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
  async loginGrow({ request, auth, response }) {
    const email = request.input("email")
    const password = request.input("password");
    const app_token = request.input('app_token')
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        let cannagrow = await Cannagrow.query().where('userId', user.id).first()

        // cannagrow = JSON.parse(JSON.stringify(cannagrow))
        if (user.userType != 3) {
          return response.json({
            'success': false,
            'messeage': 'You are not a Seller!'
          })
        }
        await User.query().where('id', user.id).update({
          "app_Token": app_token
        })
        return response.status(200).json({
          'success': true,
          'message': 'Login Complete Successfully ! ',
          "user": user,
          'cannagrow': cannagrow,
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


  async loginDep({ request, auth, response }) {
    const email = request.input("email")
    const password = request.input("password");
    try {
      if (await auth.attempt(email, password)) {
        let user = await User.findBy('email', email)
        let accessToken = await auth.generate(user)
        let dispensary = await Dispensary.query().where('userId', user.id).first()
        return response.status(200).json({
          'success': true,
          'message': 'Login Complete Successfully ! ',
          "user": user,
          'dispensary': dispensary,
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
  async editUser({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()
    //  data.userId = user.id
    let cannago = await User.query().where('id', data.id).update(data)
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
  async getUser({ request, auth, response }) {

    try {
      return await auth.getUser()
    } catch (error) {
      response.send(error)
    }
  }
  async logout({ auth, session, response }) {

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
  async sendResetCodeEmail({ request, response }) {
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
      'token': token
    })
  }

  async checkPasswordResetCode({ request, response }) {
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

      'token': data.token
    })
  }

  async resetForgotPassword({ request, response }) {
    let data = request.all()
    let password = await Hash.make(data.password)
    let check = await User.query().where('passwordToken', data.token).update({ password: password, passwordToken: null })
    return response.status(200).json({
      'success': true,
      'message': "Password Reset !",
      'check': check
    })
  }


  // Reset Password 

  async resetPassword({ request, response, auth }) {
    let data = request.all()
    let usera = await auth.getUser()
    let user = await User.query().setVisible(['id', 'password']).where('id', usera.id).first()

    const isSame = await Hash.verify(data.oldPassword, user.password)
    if (!isSame) {
      return response.status(401).json({
        msg: 'Old password is incorrect. Please provide a correct password'
      })
    }

    // hash the password 
    let password = await Hash.make(data.password)

    let check = await User.query().where('id', user.id).update({
      password: password
    })
    return response.status(200).json({
      'success': true,
      'message': "Password Reset !",
      'check': check
    })

  }

  // Test

  async test() {
    let d = new Date();
    let prev = new Date();
    prev.setDate(d.getDate() - 7);
    let monthNumber = d.getMonth() + 1
    let pmonthNumber = prev.getMonth() + 1
    monthNumber = ("0" + monthNumber).slice(-2);
    pmonthNumber = ("0" + pmonthNumber).slice(-2);
    let dayNumber = d.getDate()
    let pdayNumber = prev.getDate()
    pdayNumber = ("0" + pdayNumber).slice(-2);
    //let today = ${d.getFullYear()}-${monthNumber}-${dayNumber}

    let today = d.getFullYear() + '-' + monthNumber + '-' + dayNumber
    let laterweek = d.getFullYear() + '-' + pmonthNumber + '-' + pdayNumber

    console.log(laterweek)

    return Order.query().with('seller').select(Database.raw(' DATE_FORMAT(created_at, "%Y-%m-%d") AS created')).whereBetween('created_at', ['2019-07-14', today]).groupBy('created').fetch()
  }
}

module.exports = AuthController
