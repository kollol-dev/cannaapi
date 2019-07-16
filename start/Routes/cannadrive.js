'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/cannadrive', 'CannaDriveController.edit')

// home Routes
Route.get('/app/driverhome', 'CannaDriveController.driverHome')
Route.get('/app/indexSingleDriver/:id', 'CannaDriveController.indexSingleDriver')