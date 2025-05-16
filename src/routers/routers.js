//requerer express
const express = require('express')
//utilizar o metodo de rotas do express
const router = express.Router()
//requerer o metodo listar todos
const usersControllers = require('../controllers/usersControllers') 
//requere o controller do login
const loginControllers = require('../controllers/loginControllers')
//requerer a middleware auth
const Auth = require('../middleware/auth_user_middleware')
//requerer a middleware authAdmin
const authAdmin = require('../middleware/auth_admin_middleware')
//rota url 
//rota de listar os usuarios
router.get('/users',authAdmin,usersControllers.listAll)
//rota de listar um unico usuario
router.get('/user/:codigo',authAdmin,usersControllers.listOne)
//rota de inserir um usuario
router.post('/user',authAdmin,usersControllers.new)
//rota para exclusão do usuário
router.delete('/user/:id', authAdmin,usersControllers.remove)
//rota para login
router.post('/login', loginControllers.login)


module.exports = router