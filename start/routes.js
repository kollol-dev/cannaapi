'use strict'
require ('./Routes/cannago')
require ('./Routes/cannadrive')
require ('./Routes/cannagrow')
require ('./Routes/dispensary')
require ('./Routes/order')
require ('./Routes/report')
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.get('/app/test', 'AuthController.test')

Route.post('/auth/register', 'AuthController.register')
Route.post('/auth/registerGo', 'AuthController.registerGo')
Route.post('/auth/registerDrive', 'AuthController.registerDrive')
Route.post('/auth/registerGrow', 'AuthController.registerGrow')
Route.post('/auth/registerDep', 'AuthController.registerDep')

Route.post('/auth/loginGo', 'AuthController.loginGo')
Route.post('/auth/loginTest', 'AuthController.loginTest')
Route.post('/auth/loginDrive', 'AuthController.loginDrive')
Route.post('/auth/loginGrow', 'AuthController.loginGrow')
Route.post('/auth/loginDep', 'AuthController.loginDep')

Route.put('/app/user', 'AuthController.editUser')



Route.post('/auth/logout', 'AuthController.logout')

Route.get('/auth/getUser', 'AuthController.getUser')