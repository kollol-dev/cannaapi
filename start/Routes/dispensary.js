'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/dispensary', 'DispensaryController.edit')


// Questionnaire Routes
Route.post('/app/cannago/questionnaire','CannaGoController.storeQuestionnaire')

