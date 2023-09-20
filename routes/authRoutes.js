// Extração do metódo Router do express
const express = require('express')
const router = express.Router()

// Extração da classe 'TaskController'
const AuthController = require('../controller/authController');

// Definindo as URL's referentes aos usuários
// Página de Login
router.get('/login', AuthController.userLogin);
router.post('/login', AuthController.login);

// Página de Registro
router.get('/register', AuthController.createNewUser);
router.post('/register', AuthController.addNewUser);

// Logout
router.get('/logout', AuthController.logout);

module.exports = router;