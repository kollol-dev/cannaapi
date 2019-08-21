'use strict'
const Route = use('Route')

// User Report Routes

Route.get('/app/userreport', 'ReportController.indexUserrReport') 
Route.post('/app/userreport', 'ReportController.storeUserrReport')
Route.get('/app/userreport/:id', 'ReportController.showUserrReport')
Route.post('/app/userreportEdit', 'ReportController.editUserrReport')
Route.post('/app/userreportdelete', 'ReportController.destroyUserrReport')
// Driver Report Routes

Route.get('/app/driverreports', 'ReportController.indexDriverReport') 
Route.post('/app/driverreports', 'ReportController.storeDriverReport')
Route.get('/app/driverreports/:id', 'ReportController.showDriverReport')
Route.post('/app/driverreportsEdit', 'ReportController.editDriverReport')
Route.post('/app/driverreportsdelete', 'ReportController.destroyDriverReport')
// Grower Report Routes

Route.get('/app/growerreports', 'ReportController.indexGrowerReport') 
Route.post('/app/growerreports', 'ReportController.storeGrowerReport')
Route.get('/app/growerreports/:id', 'ReportController.showGrowerReport')
Route.post('/app/growerreportsEdit', 'ReportController.editGrowerReport')
Route.post('/app/growerreportsdelete', 'ReportController.destroyGrowerReport')