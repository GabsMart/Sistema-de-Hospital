// Importando o modelo "User"
const User = require('../models/User')

// Definindo a classe "UserController" que possui um método estático chamado "createTask".
class UserController {
    static createNewUser (req, res) {
        res.render('users/create', {layout: 'users'})
    }

    static async addNewUser (req, res) {

        const user = {
            name: req.body.name,
            lastName: req.body.lastName,
            password: req.body.password,
            userCode: Math.floor(Math.random()*100000)
        }

        await User.create(user)
        res.redirect('auth')
    }

    static userAuth (req, res) {
        res.render('users/auth', {layout: 'users'});
    }
}

// Exportando a classe "UserController"
module.exports = UserController