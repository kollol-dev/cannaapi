'use strict'
const Route = use('Route')

// Curts Routes
Route.post('/app/curts', 'OrderController.storeCurt')
Route.put('/app/curts', 'OrderController.editOrder')
Route.get('/app/curts', 'OrderController.showCurt') 
Route.delete('/app/curts', 'OrderController.destroyCurt')
// Order Routes
Route.get('/app/orders', 'OrderController.indexOrder') 
Route.post('/app/orders', 'OrderController.storeOrder')
Route.get('/app/orders/:id', 'OrderController.showOrder')
Route.delete('/app/orders', 'OrderController.destroyOrder')

// Order Details Routes

Route.get('/app/ordersdetails/:id', 'OrderController.showOrderDetails')
Route.put('/app/ordersdetails', 'OrderController.editOrderDetails')
Route.delete('/app/ordersdetails', 'OrderController.destroyOrderDetails')