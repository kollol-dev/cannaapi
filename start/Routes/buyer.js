'use strict'
const Route = use('Route')

Route.post('app/update-quanitity', 'BuyerController.updateQuantity')

Route.get('app/buyerOrder', 'BuyerController.getBuyerOrderHistory')

// status change from seller 

Route.post('app/update-order-status', 'BuyerController.updateOrderStatus')