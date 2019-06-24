'use strict'
const Route = use('Route')

// User Report Routes

Route.get('/app/userreport', 'ReportController.indexUserrReport') 
Route.post('/app/userreport', 'ReportController.storeUserrReport')
Route.get('/app/userreport/:id', 'ReportController.showUserrReport')
Route.put('/app/userreport', 'ReportController.editUserrReport')
Route.delete('/app/userreport', 'ReportController.destroyUserrReport')
// Driver Report Routes

Route.get('/app/driverreports', 'ReportController.indexDriverReport') 
Route.post('/app/driverreports', 'ReportController.storeDriverReport')
Route.get('/app/driverreports/:id', 'ReportController.showDriverReport')
Route.put('/app/driverreports', 'ReportController.editDriverReport')
Route.delete('/app/driverreports', 'ReportController.destroyDriverReport')
// Grower Report Routes

Route.get('/app/growerreports', 'ReportController.indexGrowerReport') 
Route.post('/app/growerreports', 'ReportController.storeGrowerReport')
Route.get('/app/growerreports/:id', 'ReportController.showGrowerReport')
Route.put('/app/growerreports', 'ReportController.editGrowerReport')
Route.delete('/app/growerreports', 'ReportController.destroyGrowerReport')