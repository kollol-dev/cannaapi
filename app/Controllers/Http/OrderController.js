'use strict'
const Cannagrow = use('App/Models/Cannagrow');
const Cannadrive = use('App/Models/Cannadrive');
const Curt = use('App/Models/Curt');
const User = use('App/Models/User');
const Order = use('App/Models/Order');
const OrderDetail = use('App/Models/OrderDetail');
const Noti = use('App/Models/Noti');
const Database = use('Database')
var admin = require('firebase-admin');

//firebase
// var admin = require('firebase-admin');
// var serviceAccount = require("./FirebaseAdminSDK_PvtKey/cannaapp-87a30-firebase-adminsdk-2zpyz-cbc3a9713e.json");
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://cannaapp-87a30.firebaseio.com"
// });

class OrderController {
  async storeOrder({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()
    data.userId = user.id
    let notific = {
      title: data.title,
      body: data.body
    }

    delete data.title
    delete data.body

    let price = 0
    let netPrice = 0
    let curtInfo = await Curt.query().where('userId', user.id).with('item').fetch()
    console.log('curt info', curtInfo)
    if (!curtInfo) {
      return response.status(402).json({
        'success': false,
        'message': "You don't have anything in your Curt"
      })
    }
    await Curt.query().where('userId', user.id).delete()
    console.log('curtinfo', curtInfo)
    curtInfo = JSON.parse(JSON.stringify(curtInfo))
    let sellerId = 1
    for (let d of curtInfo) {
      price = price + (d.item.price * d.quantity)
      netPrice = netPrice + (d.item.netPrice * d.quantity)
      sellerId = d.item.growId
    }

    const sellerUserId = await Cannagrow.query().where('id', sellerId).first()
    data.price = price
    data.sellerId = sellerId
    data.netPrice = netPrice
    data.deliveryFee = sellerUserId.deliveryFee

    let order = await Order.create(data)
    console.log('order', order)
    let allCurtInfo = []
    for (let d of curtInfo) {
      let ob = {
        orderId: order.id,
        itemId: d.itemId,
        quantity: d.quantity
      }
      allCurtInfo.push(ob)
    }
    console.log('allCurtInfo', allCurtInfo)

    let token = await User.query().where('id', sellerUserId.userId).select('app_Token').first()
    console.log('token_id', token)
    let mToken = JSON.parse(JSON.stringify(token))
    console.log('mToken', mToken)
    var registrationToken = mToken.app_Token;
    console.log('reg_token', registrationToken)
    var message = {
      data: {
        score: '850',
        time: '2:45'
      },
      notification: {
        title: notific.title,
        body: notific.body
      },
      token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });


    Noti.create({
      'user_id': sellerUserId.userId,
      'title': 'New Order',
      'msg': `You have a new order from ${user.name}`,
    })


    await OrderDetail.createMany(allCurtInfo);
    return response.status(200).json({
      'success': true,
      'message': 'response stored successfully !',
      "order": order
    })

  }
  async indexOrder({ request, response, auth }) {

    let user = await auth.getUser()

    let order = await Order.query().where('userId', user.id).with('orderdetails').with('driver').with('orderdetails.item').orderBy('id', 'desc').fetch()
    return response.status(200).json({
      'success': true,
      'message': 'requested data returnd  successfully !',
      "order": order
    })


  }
  async indexOrderSeller({ request, response, auth }) {

    let user = await auth.getUser()
    let seller = await User.query().where('id', user.id).with('sellerProfile').first()
    seller = seller.toJSON();

    let order = await Order.query().where('sellerId', seller.sellerProfile.id).with('driver.user').with('driver.avgRating').with('orderdetails').with('orderdetails.item').with('buyer').with('buyer.buyerProfile').orderBy('id', 'desc').fetch()
    return response.status(200).json({
      'success': true,
      'message': 'requested data returnd  successfully !',
      "order": order
    })


  }
  async indexDriverSeller({ request, response, auth }) {

    let user = await auth.getUser()
    let seller = await User.query().where('id', user.id).with('driverProfile').first()
    seller = seller.toJSON();

    let order = await Order.query().where('driverId', seller.driverProfile.id).with('seller').with('orderdetails').with('orderdetails.item').with('buyer').with('buyer.buyerProfile').orderBy('id', 'desc').fetch()
    return response.status(200).json({
      'success': true,
      'message': 'requested data returnd  successfully !',
      "order": order
    })


  }
  async showOrder({ params, response, auth }) {

    let user = await auth.getUser()

    let order = await Order.query().where('id', params.id).with('orderdetails').with('driver').with('orderdetails.item').first()
    return response.status(200).json({
      'success': true,
      'message': 'requested data returnd  successfully !',
      "order": order
    })


  }
  async editOrder({ request, response, auth }) {

    let data = request.all()
    let user = await auth.getUser()
    if (data.userId != user.id) {
      return response.status(401).json({
        'success': false,
        'message': 'You are not authenticated user!'
      })
    }
    let order = await Order.query().where('id', data.id).update(data)
    return response.status(200).json({
      'success': true,
      'message': 'response edited successfully !',
    })


  }
  async destroyOrder({ response, auth, request }) {


    let user = await auth.getUser()
    let data = request.all()
    await Order.query().where('id', data.id).delete()
    await OrderDetail.query().where('orderId', data.id).delete()
    return response.status(200).json({
      'success': true,
      'message': 'response deleted successfully !',
    })


  }
  async storeCurt({ request, response, auth }) {

    let data = request.all()
    let user = await auth.getUser()
    data.userId = user.id
    const letCheck = await Curt.findOrCreate({ userId: data.userId, itemId: data.itemId })
    await Database.table('curts').where('id', letCheck.id).increment('quantity', 1)
    // await Curt.query().where('id',letCheck.id).increment('quantity', 1)
    let againCheck = await Curt.query().where('id', letCheck.id).first()
    return response.status(200).json({
      'success': true,
      'message': 'response stored successfully !',
      "curt": againCheck
    })


  }



  async showCurt({ request, response, auth }) {

    let user = await auth.getUser()

    let curt = await Curt.query().where('userId', user.id).with('item').fetch()
    return response.status(200).json({
      'success': true,
      'message': 'requested data returnd  successfully !',
      "curt": curt
    })

  }
  async destroyCurt({ request, response, auth }) {

    let data = request.all()
    let user = await auth.getUser()
    await Curt.query().where('id', data.id).delete()
    return response.status(200).json({
      'success': true,
      'message': 'response deleted successfully !',
    })


  }
  async editCurt({ request, response, auth }) {

    let data = request.all()
    let user = await auth.getUser()
    await Curt.query().where('id', data.id).update(data)
    return response.status(200).json({
      'success': true,
      'message': 'response edited successfully !',
      'data': data
    })


  }

  async drivrOrderComplete({ request, response, auth }) {
    let data = request.all()
    let user = await auth.getUser()
    const cannadriveId = await Cannadrive.query().where('userId', user.id).first()

    let firstinfo = await Order.query().where('id', data.id).first()

    if (firstinfo.driverId != cannadriveId.id) {
      return response.status(401).json({
        'success': false,
        'message': 'You are not authenticated user!'
      })
    }

    let order = await Order.query().where('id', data.id).update({
      status: 'Completed'
    })


    Noti.create({
      'user_id': firstinfo.userId,
      'title': 'Order Completed',
      'msg': `${user.name} Completed Your order ! `,
    })

    const sellerUserId = await Cannagrow.query().where('id', firstinfo.sellerId).first()

    Noti.create({
      'user_id': sellerUserId.userId,
      'title': 'Order Completed',
      'msg': `${user.name} Completed the Order No ${firstinfo.id}`,
    })

    return response.status(200).json({
      'success': true,
      'message': 'Order Status changed !',
    })

  }

  async drivrOrderMapStatus({ request, response, auth }) {
    let data = request.all()
    let user = await auth.getUser()
    const cannadriveId = await Cannadrive.query().where('userId', user.id).first()

    let firstinfo = await Order.query().where('id', data.id).first()

    if (firstinfo.driverId != cannadriveId.id) {
      return response.status(401).json({
        'success': false,
        'message': 'You are not authenticated user!'
      })
    }

    let order = await Order.query().where('id', data.id).update({
      status: data.status
    })

    return response.status(200).json({
      'success': true,
      'message': 'Order Status changed !',
    })

  }

}

module.exports = OrderController
