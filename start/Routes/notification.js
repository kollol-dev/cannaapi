'use strict'
const Route = use('Route')

// CannaGo Routes
Route.get('/app/getUnseenNoti', 'NotificationController.getUnseenNoti')
Route.post('/app/updateNoti', 'NotificationController.updateNoti')