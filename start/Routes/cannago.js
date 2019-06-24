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

// Item Reviews Routes

Route.get('/app/itemreviewsbyItems/:id', 'CannaGoController.indexItemReviewByItems')
Route.get('/app/itemreviewsbyUser/:id', 'CannaGoController.indexItemReviewByUser')
Route.get('/app/itemreviewsbyGrower/:id', 'CannaGoController.indexItemReviewByGrower')
Route.post('/app/itemreviews', 'CannaGoController.storeItemReview')
Route.get('/app/itemreviews/:id', 'CannaGoController.showItemReview')
Route.put('/app/itemreviews', 'CannaGoController.editItemReview')
Route.delete('/app/itemreviews', 'CannaGoController.destroyItemReview')


// Questionnaire Routes
Route.post('/app/cannago/questionnaire','CannaGoController.storeQuestionnaire')