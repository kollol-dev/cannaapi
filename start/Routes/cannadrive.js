'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/cannadrive', 'CannaDriveController.edit')

// home Routes
Route.get('/app/driverhome', 'CannaGrowController.driverHome')