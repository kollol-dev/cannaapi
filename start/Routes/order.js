'use strict'
const Route = use('Route')

// Curts Routes
Route.post('/app/curts', 'OrderController.storeCurt')
Route.put('/app/curts', 'OrderController.editCurt')
Route.get('/app/curts', 'OrderController.showCurt') 
Route.post('/app/curtsdelete', 'OrderController.destroyCurt')
// Order Routes
Route.get('/app/orders', 'OrderController.indexOrder') 
Route.get('/app/ordersSeller', 'OrderController.indexOrderSeller') 
Route.post('/app/orders', 'OrderController.storeOrder')
Route.get('/app/orders/:id', 'OrderController.showOrder')
Route.post('/app/ordersdelete', 'OrderController.destroyOrder')

// Order Details Routes

Route.get('/app/ordersdetails/:id', 'OrderController.showOrderDetails')
Route.put('/app/ordersdetails', 'OrderController.editOrderDetails')
Route.post('/app/ordersdetailsdelete', 'OrderController.destroyOrderDetails')