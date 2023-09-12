// Extração do metódo Router do express
const express = require('express')
const router = express.Router()

// Extração da classe 'TaskController'
const UserController = require('../controller/userController');
const User = require('../models/User');

// Definindo as URL's referentes aos usuários
router.get('/add', UserController.createNewUser);
router.post('/add', UserController.addNewUser);
router.get('/auth', UserController.userAuth);

module.exports = router;