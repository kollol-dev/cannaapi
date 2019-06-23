'use strict'
const Route = use('Route')

// CannaGo Routes
Route.put('/app/cannagrow', 'CannaGrowController.edit')

// Items Routes
Route.get('/app/items', 'CannaGrowController.indexItem')
Route.post('/app/items', 'CannaGrowController.storeItem')
Route.get('/app/items/:id', 'CannaGrowController.showItem')
Route.put('/app/items', 'CannaGrowController.editItem')
Route.delete('/app/items', 'CannaGrowController.destroyItem')