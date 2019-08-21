'use strict'
const Cannagrow = use('App/Models/Cannagrow');
const Cannadrive = use('App/Models/Cannadrive');
const Curt = use('App/Models/Curt'); 
const User = use('App/Models/User'); 
const Order = use('App/Models/Order');
const OrderDetail = use('App/Models/OrderDetail');
const Noti = use('App/Models/Noti');
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

              const sellerUserId = await Cannagrow.query().where('id', sellerId).first()

              Noti.create({
                  'user_id' : sellerUserId.userId, 
                  'title' : 'New Order', 
                  'msg' : `You have a new order from ${user.name}`, 
              })


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
              
              let order = await Order.query().where('userId',user.id).with('orderdetails').with('driver').with('orderdetails.item').orderBy('id','desc').fetch()
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
              let seller = await User.query().where('id',user.id).with('sellerProfile').first()
              seller = seller.toJSON();
             
              let order = await Order.query().where('sellerId',seller.sellerProfile.id).with('driver').with('orderdetails').with('orderdetails.item').with('buyer').with('buyer.buyerProfile').orderBy('id','desc').fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "order": order
                })
        
  
    }
      async indexDriverSeller({request,response,auth}){
        
              let user =  await auth.getUser()
              let seller = await User.query().where('id',user.id).with('driverProfile').first()
              seller = seller.toJSON();
             
              let order = await Order.query().where('driverId',seller.driverProfile.id).with('seller').with('orderdetails').with('orderdetails.item').with('buyer').with('buyer.buyerProfile').orderBy('id','desc').fetch()
              return response.status(200).json({
                  'success': true,
                  'message': 'requested data returnd  successfully !', 
                  "order": order
                })
        
  
    }
      async showOrder({params,response,auth}){
        //  try {
              let user =  await auth.getUser()
              
              let order = await Order.query().where('id',params.id).with('orderdetails').with('driver').with('orderdetails.item').first()
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
            let order =await Order.query().where('id',data.id).update(data)
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

    async drivrOrderComplete({request,response,auth}){
      let data = request.all()
      let user =  await auth.getUser()
      const cannadriveId = await Cannadrive.query().where('userId', user.id).first()
      
      let firstinfo =await Order.query().where('id',data.id).first()
      
      if(firstinfo.driverId != cannadriveId.id){
        return response.status(401).json({
                  'success': false,
                  'message': 'You are not authenticated user!'
              })
      }
      
        let order =await Order.query().where('id',data.id).update({
          status:'Completed'
        })
        
        
        Noti.create({
          'user_id' : firstinfo.userId, 
          'title' : 'Order Completed', 
          'msg' : `${user.name} Completed Your order ! `, 
        })

          const sellerUserId = await Cannagrow.query().where('id', firstinfo.sellerId).first()

              Noti.create({
                  'user_id' : sellerUserId.userId, 
                  'title' : 'Order Completed', 
                  'msg' : `${user.name} Completed the Order No ${firstinfo.id}`, 
              })
        
        return response.status(200).json({
          'success': true,
          'message': 'Order Status changed !', 
        })

}

}

module.exports = OrderController
