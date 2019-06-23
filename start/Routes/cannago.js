'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/cannago', 'CannaGoController.edit')

// User Report Routes

Route.get('/app/userreport', 'CannaGoController.indexUserrReport')
Route.post('/app/userreport', 'CannaGoController.storeUserrReport')
Route.get('/app/userreport/:id', 'CannaGoController.showUserrReport')
Route.put('/app/userreport', 'CannaGoController.editUserrReport')
Route.delete('/app/userreport', 'CannaGoController.destroyUserrReport')


// Questionnaire Routes
Route.post('/app/cannago/questionnaire','CannaGoController.storeQuestionnaire')