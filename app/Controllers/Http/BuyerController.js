'use strict'
const User = use('App/Models/User');
const Cannagrow = use('App/Models/Cannagrow');
const Curt = use('App/Models/Curt');
const Item = use('App/Models/Item');
const ItemTag = use('App/Models/ItemTag');
const ItemReview = use('App/Models/ItemReview');
const Database = use('Database')
var _ = require('lodash')
class BuyerController {
   async updateQuantity({auth,request}){
       const uid = await auth.user.id 
       const data = request.all()
       console.log('data is', data)
       return Curt.query().where('id', data.id).where('userId', uid).update({
           'quantity' : data.quantity
       }) 
   }

}

module.exports = BuyerController
