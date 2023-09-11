// Obtém o pacote Sequelize.
const {Sequelize} = require('sequelize')

// Cria um novo objeto com as informações de nome do banco de dados, usuário e senha, nesta ordem.
const sequelize = new Sequelize('hospital', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

// Tenta conectar ao MySQL com as informações inseridas acima. Caso não consiga, mostra o erro no console.
try {
    sequelize.authenticate()
    console.log('Conectou ao banco de dados')
} catch (error) {
    console.log(error)
}

// Exporta a conexão do banco de dados. Vamos utilizar esta conexão no arquivo principal 'index.js
module.exports = sequelize