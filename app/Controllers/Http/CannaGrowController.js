'use strict'
const User = use('App/Models/User');
const Cannagrow = use('App/Models/Cannagrow');
const Item = use('App/Models/Item');
const Order = use('App/Models/Order');
const Noti = use('App/Models/Noti');
const ItemTag = use('App/Models/ItemTag');
const ItemReview = use('App/Models/ItemReview');
const Database = use('Database')
var _ = require('lodash')
class CannaGrowController {

  async edit({ request, response, auth }) {
    //  try {
    let data = request.all()

    console.log('request data', data)
    let user = await auth.getUser()
    //  data.userId = user.id
    let cannago = await Cannagrow.query().where('id', data.id).update(data)
    if (cannago == 1) {
      return response.status(200).json({
        'success': true,
        'message': 'response Updated successfully !',
        'data': data,
      })
    }

    return response.status(200).json({
      'success': false,
      'message': 'Something went wrong !',
      'data': [],
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async cannagrowAllSearch({ request, response, auth }) {
    console.log('all shops')
    //  try {
    //  let user =  await auth.getUser()
    let sortType = request.input('sortType') ? request.input('sortType') : ''
    let price1 = request.input('price1') ? request.input('price1') : ''
    let price2 = request.input('price2') ? request.input('price2') : ''
    let rawData = Cannagrow.query().with('user').with('reviews').withCount('reviews').with('avgRating').with('avgPrice').orderBy('id', 'desc')

    if (price1 && price2) {
      rawData.whereHas('avgPrice', (builder) => {
        builder.where('averagePrice', '>=', price1)
        builder.where('averagePrice', '<=', price2)
      })
    }
    let allItems = await rawData.fetch()
    allItems = JSON.parse(JSON.stringify(allItems))
    for (let d of allItems) {
      if (d.avgRating == null) {
        d.avgRating = {
          averageRating: 0
        }
      }
    }

    if (sortType) {

      if (sortType == 'Alphabetical') {
        allItems = _.orderBy(allItems, 'name', 'asc')
      }
      else if (sortType == 'BestRated') {
        console.log('this is ok')
        allItems = _.orderBy(allItems, 'avgRating.averageRating', 'desc')
      }
      else if (sortType == 'MostPopular') {
        allItems = _.orderBy(allItems, '__meta__.reviews_count', 'desc')
      }
    }
    return response.status(200).json({
      'success': true,
      "shop": allItems,
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async indexItem({ request, response, auth }) {
    //  try {
    let user = await auth.getUser()
    let allItems = await Item.query().where('userId', user.id).with('tags').with('reviews').fetch()

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
    let txt = request.input('txt') ? request.input('txt') : ''

    let rawData = Item.query().with('tags').with('store').with('user').with('reviews')
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
    if (txt) {
      rawData.where('keyword', 'like', '%' + txt + '%')
      rawData.orWhere('description', 'like', '%' + txt + '%')
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
  async itemsAllSearch({ request, response, auth }) {
    //  try {
    //  let user =  await auth.getUser()
    let sortType = request.input('sortType') ? request.input('sortType') : ''
    let price1 = request.input('price1') ? request.input('price1') : ''
    let price2 = request.input('price2') ? request.input('price2') : ''
    let key = request.input('key') ? request.input('key') : ''
    let rawData = Item.query().with('tags').with('store').with('user').with('reviews').withCount('reviews').with('avgRating')
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
    let allItems = await rawData.fetch()
    allItems = JSON.parse(JSON.stringify(allItems))
    let shopIndex = []
    for (let d of allItems) {
      shopIndex.push(d.growId)
      if (d.avgRating == null) {
        d.avgRating = {
          averageRating: 0
        }
      }
    }

    if (sortType) {

      if (sortType == 'Alphabetical') {
        allItems = _.orderBy(allItems, 'name', 'asc')
      }
      else if (sortType == 'BestRated') {
        console.log('this is ok')
        allItems = _.orderBy(allItems, 'avgRating.averageRating', 'desc')
      }
      else if (sortType == 'MostPopular') {
        allItems = _.orderBy(allItems, '__meta__.reviews_count', 'desc')
      }
    }
    // 
    //  var uniqueItems = Array.from(new Set(shopIndex))

    // let shop = await Cannagrow.query().whereIn('id',uniqueItems).fetch()




    return response.status(200).json({
      'success': true,
      "allItems": allItems,
      // "shop": shop,
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async showItem({ request, response, auth, params }) {
    //  try {
    let item = await Item.query().where('id', params.id).with('tags').with('store').with('user').with('reviews').withCount('reviews')
      .with('avgRating')
      .first()
    return response.status(200).json({
      'success': true,
      "item": item
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async showItemByStore({ request, response, auth, params }) {
    //  try {
    let item = await Item.query().where('growId', params.id).with('tags').with('store').with('user').with('reviews').withCount('reviews')
      .with('avgRating')
      .first()
    return response.status(200).json({
      'success': true,
      "item": item
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async storeItem({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()
    data.userId = user.id
    let tags = data.tags
    delete data.tags
    let item = await Item.create(data)
    let allTags = []
    if (tags) {
      for (let d of tags) {
        let tag = {
          itemId: item.id,
          keyword: d
        }
        allTags.push(tag)
      }
      await ItemTag.createMany(allTags);
    }
    return response.status(200).json({
      'success': true,
      'message': 'response stored successfully !',
      "item": item
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async editItem({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()

    console.log("request", data)
    if (data.userId != user.id) {
      return response.status(401).json({
        'success': false,
        'message': 'You are not authenticated user!'
      })
    }
    let tags = data.tags
    delete data.tags
    let item = await Item.query().where('id', data.id).update(data)

    await ItemTag.query().where('itemId', data.id).delete()

    let allTags = []
    for (let d of tags) {
      let tag = {
        itemId: data.id,
        keyword: d
      }
      allTags.push(tag)
    }
    await ItemTag.createMany(allTags);
    return response.status(200).json({
      'success': true,
      'message': 'response edited successfully !',
      "item": item
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async growHome({ request, response, auth, params }) {
    //  try {
    let totalsales = await User.query().where('id', params.id).with('totalsales').first()
    let grower = await Cannagrow.query().where('userId', params.id).first()
    const mostPopular = await Database.raw('SELECT items.* , cast(AVG(item_reviews.rating) as decimal(10,2)) AS averageRating FROM items LEFT JOIN item_reviews ON items.id = item_reviews.itemId WHERE items.growId = ? GROUP BY items.id ORDER by averageRating desc limit 3 ', [grower.id])
    const leastPopular = await Database.raw('SELECT items.* , cast(AVG(item_reviews.rating) as decimal(10,2)) AS averageRating FROM items LEFT JOIN item_reviews ON items.id = item_reviews.itemId WHERE items.growId = ? GROUP BY items.id ORDER by averageRating ASC limit 3 ', [grower.id])
    return response.status(200).json({
      'success': true,
      'message': 'request data recived successfully !',
      "item": totalsales,
      "mostPopular": mostPopular[0],
      "leastPopular": leastPopular[0]
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }
  async destroyItem({ request, response, auth }) {
    //  try {
    let data = request.all()
    let user = await auth.getUser()
    await Item.query().where('id', data.id).delete()
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
  async vendorlist({ request, response, auth, params }) {
    //  try {
    let growerlist = await Cannagrow.query().with('user').fetch()
    return response.status(200).json({
      'success': true,
      'message': 'request data recived successfully !',
      "growerlist": growerlist,
    })
    //   } catch (error) {
    //     return response.status(401).json({
    //         'success': false,
    //         'message': 'You first need to login first!'
    //     })
    //   }

  }

  // GET ALL THE PRODUCTS OF A SELLER IN SHOP DETAILS SCREEN 
  async getShopPorudcts({ response, params }) {
    let item = await Item.query().where('growId', params.id).withCount('reviews')
      .with('avgRating')
      .fetch()
    return response.status(200).json({
      'success': true,
      "allItems": item
    })
  }

  async getReviewByProductId({ response, params }) {
    let rev = await ItemReview.query().where('itemId', params.id).with('user').fetch()

    return response.status(200).json({
      'success': true,
      "rev": rev
    })
  }

  async sellerStatuschange({ request, response, auth }) {
    let data = request.all()
    let user = await auth.getUser()
    const sellerUserId = await Cannagrow.query().where('userId', user.id).first()

    let firstinfo = await Order.query().where('id', data.id).first()

    if (firstinfo.sellerId != sellerUserId.id) {
      return response.status(401).json({
        'success': false,
        'message': 'You are not authenticated user!'
      })
    }

    let order = await Order.query().where('id', data.id).update(data)


    Noti.create({
      'user_id': firstinfo.userId,
      'title': 'Status Changed',
      'msg': `${sellerUserId.name} change the status to  '${data.status}'! `,
    })

    return response.status(200).json({
      'success': true,
      'message': 'Order Status changed !',
    })

  }

  // Seller Weekly Income

  async sellerWeeklyIncome({ params }) {
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

    let data = await Order.query().select(Database.raw('DATE_FORMAT(created_at, "%Y-%m-%d") AS date'), Database.raw(' sum(price) AS total')).whereBetween('created_at', [laterweek, today]).where('sellerId', params.id).groupBy('date').fetch()
    data = JSON.parse(JSON.stringify(data))
    let another = [];

    for (let t in data) {

      let dd = new Date(data[t].date);
      let ob = {
        date: data[t].date,
        total: data[t].total,
        year: dd.getFullYear(),
        month: dd.getMonth() + 1,
        day: dd.getDate()
      }
      another.push(ob)

    }

    return another;
  }


  // Seller Monthly Income
  async sellerMonthlyIncome({ params }) {
    let d = new Date();
    let prev = new Date();
    let monthNumber = d.getMonth() + 1
    let pmonthNumber = prev.getMonth() + 1
    monthNumber = ("0" + monthNumber).slice(-2);
    pmonthNumber = ("0" + pmonthNumber).slice(-2);
    let dayNumber = d.getDate()
    let pdayNumber = prev.getDate()
    pdayNumber = ("0" + pdayNumber).slice(-2);

    let today = d.getFullYear() + '-' + monthNumber + '-' + dayNumber
    let previousMonth = d.getFullYear() + '-' + pmonthNumber + '-' + '1'



    let data = await Order.query().select('sellerId', Database.raw(' sum(price) AS total')).whereBetween('created_at', [previousMonth, today]).where('sellerId', params.id).fetch()

    data.month = pmonthNumber
    data = JSON.parse(JSON.stringify(data))

    return {
      sellerId: data[0].sellerId,
      total: data[0].total,
      month: d.getMonth() + 1
    }
  }

  // Seller Previous Month Income
  async sellerPreviousMonthIncome({ params }) {
    let d = new Date();
    let prev = new Date();

    let monthNumber = d.getMonth()
    let pmonthNumber = prev.getMonth()

    monthNumber = ("0" + monthNumber).slice(-2);
    pmonthNumber = ("0" + pmonthNumber).slice(-2);


    let pdayNumber = this.daysInMonth(d.getMonth(), d.getFullYear())

    pdayNumber = ("0" + pdayNumber).slice(-2);

    let today = d.getFullYear() + '-' + monthNumber + '-' + pdayNumber
    let previousMonth = d.getFullYear() + '-' + pmonthNumber + '-' + '1'



    let data = await Order.query().select('sellerId', Database.raw(' sum(price) AS total')).whereBetween('created_at', [previousMonth, today]).where('sellerId', params.id).fetch()

    data = JSON.parse(JSON.stringify(data))

    return {
      sellerId: data[0].sellerId,
      total: data[0].total,
      month: d.getMonth()
    }
  }

  // Seller Yearly Average Income
  async sellerYearlyAverageIncome({ params }) {
    let d = new Date();

    let monthNumber = d.getMonth() + 1


    monthNumber = ("0" + monthNumber).slice(-2);

    let pdayNumber = this.daysInMonth(d.getMonth(), d.getFullYear())


    pdayNumber = ("0" + pdayNumber).slice(-2);
    //let today = ${d.getFullYear()}-${monthNumber}-${dayNumber}

    let today = d.getFullYear() + '-' + monthNumber + '-' + pdayNumber
    let previousMonth = d.getFullYear() + '-' + '1' + '-' + '1'



    let data = await Order.query().select('sellerId', Database.raw(' avg(price) AS avg')).whereBetween('created_at', [previousMonth, today]).where('sellerId', params.id).fetch()

    data = JSON.parse(JSON.stringify(data))
    let another = [];

    return data
  }


  // total days in a month
  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }


}

module.exports = CannaGrowController;
