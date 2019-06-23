'use strict'
const Route = use('Route')

// Curts Routes
Route.get('/app/curts', 'OrderController.indexCurt')
Route.post('/app/curts', 'OrderController.storeCurt')
Route.get('/app/curts/:id', 'OrderController.showCurt') 
Route.put('/app/curts', 'OrderController.editCurt')
Route.delete('/app/curts', 'OrderController.destroyCurt')
// Order Routes
Route.get('/app/orders', 'OrderController.indexOrder')
Route.post('/app/orders', 'OrderController.storeOrder')
Route.get('/app/orders/:id', 'OrderController.showOrder')
Route.put('/app/orders', 'OrderController.editOrder')
Route.delete('/app/orders', 'OrderController.destroyOrder')
// Order Details Routes
Route.get('/app/ordersdetails', 'OrderController.indexOrderDetails')
Route.post('/app/ordersdetails', 'OrderController.storeOrderDetails')
Route.get('/app/ordersdetails/:id', 'OrderController.showOrderDetails')
Route.put('/app/ordersdetails', 'OrderController.editOrderDetails')
Route.delete('/app/ordersdetails', 'OrderController.destroyOrderDetails')