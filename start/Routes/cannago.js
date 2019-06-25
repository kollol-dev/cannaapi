'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/cannago', 'CannaGoController.edit')

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

