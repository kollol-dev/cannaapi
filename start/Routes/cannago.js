'use strict'
const Route = use('Route')

// CannaGo Routes
Route.post('/app/cannagoEdit', 'CannaGoController.edit')

// Item Reviews Routes

Route.get('/app/itemreviewsbyItems/:id', 'CannaGoController.indexItemReviewByItems')
Route.get('/app/itemreviewsbyUser/:id', 'CannaGoController.indexItemReviewByUser')
Route.get('/app/itemreviewsbyGrower/:id', 'CannaGoController.indexItemReviewByGrower')

Route.post('/app/itemreviews', 'CannaGoController.storeItemReview')
Route.get('/app/itemreviews/:id', 'CannaGoController.showItemReview')
Route.get('/app/itemreviewsbygrow/:id', 'CannaGoController.showItemReviewByGrow')
Route.post('/app/updateitemreviews', 'CannaGoController.editItemReview')
Route.post('/app/deleteitemreviews', 'CannaGoController.destroyItemReview')


// BrainTree Payment
Route.get('/app/getBTClientToken', 'CannaGoController.getBTClientToken')
Route.post('/app/checkout', 'CannaGoController.BTcheckout')


// Questionnaire Routes
Route.post('/app/cannago/questionnaire','CannaGoController.storeQuestionnaire')

