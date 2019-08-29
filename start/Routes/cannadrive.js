'use strict'
const Route = use('Route')

// CannaGo Routes
Route.post('/app/cannadriveEdit', 'CannaDriveController.edit')

// home Routes
Route.get('/app/driverhome', 'CannaDriveController.driverHome')
Route.get('/app/indexSingleDriver/:id', 'CannaDriveController.indexSingleDriver')


Route.get('/app/getNewOrder', 'CannaDriveController.getNewOrder')
Route.post('/app/driverAcceptOrder', 'CannaDriveController.driverAcceptOrder')
Route.post('/app/driverreviews', 'CannaDriveController.storeDriverReview')
Route.get('/app/driverreviews/:id', 'CannaDriveController.showDriverReview')
Route.get('/app/driverreviews', 'CannaDriveController.showDriverReview')
Route.put('/app/driverreviews', 'CannaDriveController.editDriverReview')
Route.post('/app/deletedriverreviews', 'CannaDriveController.destroyDriverReview')
//  buyer 
Route.get('/app/driverWeeklyIncome/:id', 'CannaDriveController.driverWeeklyIncome')
Route.get('/app/driverMonthlyIncome/:id', 'CannaDriveController.driverMonthlyIncome')
Route.get('/app/driverPreviousMonthIncome/:id', 'CannaDriveController.driverPreviousMonthIncome')
Route.get('/app/driverYearlyAverageIncome/:id', 'CannaDriveController.driverYearlyAverageIncome')