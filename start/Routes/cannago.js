'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/cannago', 'CannaGoController.edit')

// User Report Routes

Route.put('/app/userreport', 'CannaGoController.store')


// Questionnaire Routes
Route.post('/app/cannago/questionnaire','CannaGoController.storeQuestionnaire')