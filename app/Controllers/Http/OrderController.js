'use strict'
const Cannagrow = use('App/Models/Cannagrow');
const Curt = use('App/Models/Curt');
const Order = use('App/Models/Order');
const OrderDetail = use('App/Models/OrderDetail');
class OrderController {
    async storeOrder({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let price =0
              let netPrice =0
              let curtInfo = await Curt.query().where('userId',user.id).with('product').fetch()
              if(!curtInfo){
                return response.status(402).json({
                    'success': false,
                    'message': "You don't have anything in your Curt"
                })
              }
              await Curt.query().where('userId',user.id).delete()
              curtInfo = JSON.parse(JSON.stringify(curtInfo))
              for(let d of curtInfo){
                price = price + (d.product.price*d.quantity)
                netPrice = netPrice + (d.product.netPrice * d.quantity)
              }
              data.price = price
              data.netPrice = netPrice
              let order =await Order.create(data)
              let allCurtInfo = []
              for(let d of curtInfo){
                  let ob = {
                    orderId:order.id,
                    itemId:d.itemId,
                    quantity:d.quantity
                  }
                  allCurtInfo.push(ob)
              }
              await OrderDetail.createMany(allCurtInfo);
                return response.status(200).json({
                    'success': true,
                    'message': 'response stored successfully !', 
                    "order": order
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
    async storeCurt({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let curt =await Curt.create(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !', 
                  "curt": curt
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
      }
    async destroyCurt({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              await Curt.query().where('id',data.id).delete()
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

}

module.exports = OrderController
