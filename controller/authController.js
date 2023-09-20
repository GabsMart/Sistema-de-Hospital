// Importando o modelo "User"
const User = require('../models/User')

// Para criptografar a senha
const bcrypt = require('bcryptjs')

// Definindo a classe "AuthController" que possui os metodos referentes a login e registro de usuário
class AuthController {
    static userLogin (req, res) {
        res.render('auth/login')
    }

    static async login (req, res) {
        const {userCode, password} = req.body

        // Procura pelo código de usuário
        const user = await User.findOne({where: {userCode: userCode}})

        // Confirma se o código do usuário existe
        if (!user) {
            req.flash('message', 'Código de Usuário não encontrado. Tente novamente.')
            res.render('auth/login');
            return
        }

        // Confirma se a senha está correta
        const passwordMatch = bcrypt.compareSync(password, user.password)
        if (!passwordMatch) {
            req.flash('message', 'Senha inválida. Tente novamente.')
            res.render('auth/login');
            return
        }

        // Se o código e senha estiverem corretos, logar no sistema
        req.session.userid = user.id
        req.session.save();

        // Se a ocupação estiver vazia, significa que o usuário ainda não foi aprovado no sistema. A página de autorização informa isso ao usuário
        const occupation = null;
        const useroccupation = await User.findOne({where: {occupation: occupation, userCode: userCode}})
    
        // Verifica se a ocupação está vazia  
        if (useroccupation) {
            res.render('auth/auth')
        } else {
            res.render('auth/register')
        }
    }

    static createNewUser (req, res) {
        res.render('auth/register')
    }

    static async addNewUser (req, res) {
        
        const { name, lastName, password, confirmpassword } = req.body

        // Confirma se a senha é igual a confirmação da senha
        if( password != confirmpassword) {
            req.flash('message', 'As senhas não conferem, tente novamente!')
            res.render('auth/register');
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

            // Salva a sessão após cadastro
            req.session.userid = createdUser.id
            req.session.save(() => {
                req.flash('message', 'Cadastro realizado com sucesso. Seu código de usuário é')
                res.render('auth/login')
            })

        } catch (error) {
            console.log(error)
        }
    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/login')
    }
}

// Exportando a classe "AuthController"
module.exports = AuthController