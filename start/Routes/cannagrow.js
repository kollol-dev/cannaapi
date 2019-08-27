'use strict'
const Route = use('Route')

// CannaGo Routes
Route.post('/app/cannagrowEdit', 'CannaGrowController.edit') 
Route.get('/app/cannagrowAllSearch', 'CannaGrowController.cannagrowAllSearch')
// Route.get('/app/cannagrowAllSearch/:id', 'CannaGrowController.cannagrowAllSearchId')
// Items Routes
Route.get('/app/items', 'CannaGrowController.indexItem')
Route.get('/app/itemsAll', 'CannaGrowController.indexItemAll')
Route.get('/app/itemsAllSearch', 'CannaGrowController.itemsAllSearch')
Route.post('/app/items', 'CannaGrowController.storeItem')
Route.get('/app/items/:id', 'CannaGrowController.showItem')
Route.get('/app/itemsbyStore/:id', 'CannaGrowController.showItemByStore')
Route.put('/app/items', 'CannaGrowController.editItem')
Route.post('/app/itemsDelete', 'CannaGrowController.destroyItem')
// Tags Routes
Route.get('/app/tags', 'CannaGrowController.indexTag')
Route.post('/app/tags', 'CannaGrowController.storeTag')
Route.get('/app/tags/:id', 'CannaGrowController.showTag')
Route.put('/app/tags', 'CannaGrowController.editTag')
Route.delete('/app/tags', 'CannaGrowController.destroyTag') 

// home Routes
Route.get('/app/growhome/:id', 'CannaGrowController.growHome')
Route.get('/app/sellerWeeklyIncome/:id', 'CannaGrowController.sellerWeeklyIncome')
// Map page
Route.post('/app/vendorlist','CannaGrowController.vendorlist')

Route.post('/app/sellerStatuschange','CannaGrowController.sellerStatuschange')

Route.get('app/allShopItems/:id', 'CannaGrowController.getShopPorudcts')
Route.get('app/productReview/:id', 'CannaGrowController.getReviewByProductId')