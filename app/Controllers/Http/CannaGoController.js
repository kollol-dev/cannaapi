'use strict'
const Questionnaire = use('App/Models/Questionnaire');
const Item = use('App/Models/Item');
const ItemReview = use('App/Models/ItemReview');
const Cannago = use('App/Models/Cannago');
const Noti = use('App/Models/Noti');
const User = use('App/Models/User');

// braintree 
const braintree = require("braintree");
const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "c85s32r8w558rv4g",
  publicKey: "xs289z6nkpnqm9hb",
  privateKey: "eab9ae3f95dfe2f7a87ae612f2f90fd7"
});


class CannaGoController {
  async edit({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()
    //  data.userId = user.id
    let cannago = await Cannago.query().where('id', data.id).update(data)
    return response.status(200).json({
      'success': true,
      'message': 'response Updated successfully !',
      'data': data
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }

  async storeQuestionnaire({ request, response, auth }) {
    try {
      let data = request.all()
      let user = await auth.getUser()
      data.userId = user.id
      let questionnaire = await Questionnaire.create(data)
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
  async indexItem({ request, response, auth }) {
    //  try {
    //  let user =  await auth.getUser()
    let allItems = await Item.query().where('userId', 7).with('tags').fetch()

    return response.status(200).json({
      'success': true,
      "allItems": allItems
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async indexItemAll({ request, response, auth }) {
    //  try {
    //  let user =  await auth.getUser()


    let sortType = request.input('sortType') ? request.input('sortType') : ''
    let price1 = request.input('price1') ? request.input('price1') : ''
    let price2 = request.input('price2') ? request.input('price2') : ''
    let key = request.input('key') ? request.input('key') : ''

    let rawData = Item.query().where('userId', 7).with('tags').with('store').with('user')
    if (price1 && price2) {
      console.log("this is ok")
      rawData.where('price', '>=', price1)
      rawData.where('price', '<=', price2)

    }
    if (key) {
      rawData.whereHas('tags', (builder) => {
        builder.where('keyword', 'like', '%' + key + '%')
      })
    }
    if (sortType) {
      if (sortType == 'Alphabetical') {
        rawData.orderBy('name', 'asc')
      }
    }
    let allItems = await rawData.fetch()
    return response.status(200).json({
      'success': true,
      "allItems": allItems
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }

  async showItemReview({ request, response, auth, params }) {
    //  try {
    let itemReview = await ItemReview.query().where('itemId', params.id).with('item').with('store').with('user').fetch()
    return response.status(200).json({
      'success': true,
      "itemReview": itemReview
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async showItemReviewByGrow({ request, response, auth, params }) {
    //  try {
    let itemReview = await ItemReview.query().where('growId', params.id).with('item').with('store').with('user').fetch()
    return response.status(200).json({
      'success': true,
      "itemReview": itemReview
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async indexItemReviewByUser({ request, response, auth, params }) {
    //  try {
    let itemReview = await ItemReview.query().where('userId', params.id).with('item').with('store').with('user').fetch()
    return response.status(200).json({
      'success': true,
      "itemReview": itemReview
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async indexItemReviewByItems({ request, response, auth, params }) {
    //  try {
    let itemReview = await ItemReview.query().where('itemId', params.id).with('item').with('user').fetch()
    return response.status(200).json({
      'success': true,
      "itemReviews": itemReview
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async indexItemReviewByGrower({ request, response, auth, params }) {
    //  try {
    let itemReview = await ItemReview.query().where('growId', params.id).with('item').with('store').with('user').fetch()
    return response.status(200).json({
      'success': true,
      "itemReview": itemReview
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async storeItemReview({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()
    data.userId = user.id

    let itemReview = await ItemReview.create(data)

    let userId = await Item.query().select('userId').where('id', itemReview.itemId).first()

    await Noti.create({
      'user_id': userId.userId,
      'title': 'Review Created',
      'msg': `You got new review!`,
    })

    return response.status(200).json({
      'success': true,
      'message': 'response stored successfully !',
      "itemReview": itemReview
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async editItemReview({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()
    if (data.userId == user.id) {
      return response.status(401).json({
        'success': false,
        'message': 'You are not authenticated user'
      })
    }
    let itemReview = await ItemReview.query().where('id', data.id).update(data)

    return response.status(200).json({
      'success': true,
      'message': 'response updated successfully !',
      "itemReview": itemReview
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async destroyItemReview({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()

    if (data.userId == user.id) {
      return response.status(401).json({
        'success': false,
        'message': 'You are not authenticated user'
      })
    }
    await ItemReview.query().where('id', data.id).delete()

    return response.status(200).json({
      'success': true,
      'message': 'response deleted successfully !',
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }


  // BrainTree Payment Request Client Id
  async getBTClientToken({ request, response }) {
    let res = await gateway.clientToken.generate()
    return response.json({
      token: res.clientToken
    })

  }


  async BTcheckout({ request, response }) {

    let data = request.all()

    let tResult = await gateway.transaction.sale({
      amount: data.amount,
      paymentMethodNonce: data.nonce,
      options: {
        submitForSettlement: true
      }
    })

    return tResult
  }


}

module.exports = CannaGoController;
