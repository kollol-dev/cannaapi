'use strict'
const Cannagrow = use('App/Models/Cannagrow');
const Curt = use('App/Models/Curt'); 
const Order = use('App/Models/Order');
const OrderDetail = use('App/Models/OrderDetail');
const Database = use('Database')
class OrderController {
    async storeOrder({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              let price =0
              let netPrice =0
              let curtInfo = await Curt.query().where('userId',user.id).with('item').fetch()
              if(!curtInfo){
                return response.status(402).json({
                    'success': false,
                    'message': "You don't have anything in your Curt"
                })
              }
              await Curt.query().where('userId',user.id).delete()
              curtInfo = JSON.parse(JSON.stringify(curtInfo))
              let sellerId = 1
              for(let d of curtInfo){
                price = price + (d.item.price*d.quantity)
                netPrice = netPrice + (d.item.netPrice * d.quantity)
                  sellerId = d.item.growId
              }
              data.price = price
              data.sellerId = sellerId
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
      async indexOrder({request,response,auth}){
        //  try {
              let user =  await auth.getUser()
              
              let order = await Order.query().where('userId',user.id).with('orderdetails').with('orderdetails.item').fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "order": order
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
      async indexOrderSeller({request,response,auth}){
        
              let user =  await auth.getUser()
              
              let order = await Order.query().where('sellerId',user.id).with('orderdetails').with('orderdetails.item').with('buyer').with('buyer.buyerProfile').fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "order": order
                })
        
  
    }
      async showOrder({params,response,auth}){
        //  try {
              let user =  await auth.getUser()
              
              let order = await Order.query().where('id',params.id).with('orderdetails').with('orderdetails.item').first()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "order": order
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
      async destroyOrder({response,auth,request}){
        
        //  try {
              let user =  await auth.getUser()
              let data = request.all()
                await Order.query().where('id',data.id).delete()
                await OrderDetail.query().where('orderId',data.id).delete()
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
    async storeCurt({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              data.userId = user.id
              const letCheck = await Curt.findOrCreate({ userId: data.userId, itemId: data.itemId })
              await Database.table('curts').where('id', letCheck.id).increment('quantity', 1)
              // await Curt.query().where('id',letCheck.id).increment('quantity', 1)
              let againCheck = await Curt.query().where('id',letCheck.id).first()
              return response.status(200).json({
                  'success': true,
                  'message': 'response stored successfully !', 
                  "curt": againCheck
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }
    async editOrder({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              if(data.userId != user.id){
                return response.status(401).json({
                          'success': false,
                          'message': 'You are not authenticated user!'
                      })
              }
              let curt =await Curt.query().where('id',data.id).update(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response edited successfully !', 
                })
          //   } catch (error) {
          //     return response.status(401).json({
          //         'success': false,
          //         'message': 'You first need to login first!'
          //     })
          //   }
  
    }


    async showCurt({request,response,auth}){
        //  try {
              let user =  await auth.getUser()
              
              let curt = await Curt.query().where('userId',user.id).with('item').fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
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
       async editCurt({request,response,auth}){
        //  try {
              let data = request.all()
              let user =  await auth.getUser()
              await Curt.query().where('id',data.id).update(data)
              return response.status(200).json({
                  'success': true,
                  'message': 'response edited successfully !',
                  'data':data
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
