'use strict'
const Route = use('Route')

// CannaGo Routes
Route.get('/app/getUnseenNoti', 'NotificationController.getUnseenNoti')
Route.get('/app/getUnseenNotiDetails', 'NotificationController.getUnseenNotiDetails')
Route.post('/app/updateNoti', 'NotificationController.updateNoti')