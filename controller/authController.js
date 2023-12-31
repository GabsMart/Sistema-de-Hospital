// Importando o modelo "User"
const User = require('../models/User')

// Para criptografar a senha
const bcrypt = require('bcryptjs')

// Definindo a classe "AuthController" que possui os metodos referentes a login e registro de usuário
class AuthController {
    static userLogin (req, res) {
        res.render('auth/login', {layout: 'user'})
    }

    static async login (req, res) {
        const {userCode, password} = req.body

        // Procura pelo código de usuário
        const user = await User.findOne({where: {userCode: userCode}})

        // Confirma se o código do usuário existe
        if (!user) {
            req.flash('message', 'Código de Usuário não encontrado. Tente novamente.')
            res.render('auth/login', {layout: 'user'});
            return
        }

        // Confirma se a senha está correta
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) {
            req.flash('message', 'Senha inválida. Tente novamente.')
            res.render('auth/login', {layout: 'user'});
            return
        }

        // Verifica se o usuário possui ocupação. Se não tiver, não está aprovado no sistema, portanto será redirecionado para tal página.
        const useroccupation = await User.findOne({where: {userCode: userCode}})
        if (useroccupation.occupation == null) {
            res.render('auth/auth', {layout: 'auth'})
        }

        // Se o código e senha estiverem corretos, logar no sistema
        req.session.userid = user.id
        req.session.save()

        const usuario = await User.findOne({where: {userCode: userCode}})
        res.render('dashboard/dashboard', {usuario})
    }

    static createNewUser (req, res) {
        res.render('auth/register', {layout: 'user'})
    }

    static async addNewUser (req, res) {
        
        const { name, lastName, password, confirmpassword } = req.body

        // Confirma se a senha é igual a confirmação da senha
        if( password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register', {layout: 'user'});
            return
        }

        // Criar senha
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {
            name,
            lastName,
            password: hashedPassword,
            userCode: Math.floor(Math.random()*10000)
        }

        try {
            const createdUser = await User.create(user)
            const userId = createdUser.id
            const newUser = await User.findOne({where: {id:userId}})

            req.flash('message', `Cadastro realizado com sucesso. Seu código de usuário é ${newUser.userCode}`)
            res.render('auth/login', {layout: 'user'})

        } catch (error) {
            console.log(error)
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login')
    }

    static dashboard(req,res) {
        res.render('dashboard/dashboard', {layout: 'dashboard'});
    }
}

// Exportando a classe "AuthController"
module.exports = AuthController