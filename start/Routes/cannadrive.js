'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/cannadrive', 'CannaDriveController.edit')

// home Routes
Route.get('/app/driverhome', 'CannaDriveController.driverHome')
Route.get('/app/indexSingleDriver/:id', 'CannaDriveController.indexSingleDriver')

 Route.post('/app/driverreviews', 'CannaGoController.storeDriverReview')
 Route.get('/app/driverreviews/:id', 'CannaGoController.showDriverReview')
 Route.get('/app/driverreviews', 'CannaGoController.showDriverReview')
 Route.put('/app/driverreviews', 'CannaGoController.editDriverReview')
 Route.post('/app/deletedriverreviews','CannaGoController.destroyDriverReview')