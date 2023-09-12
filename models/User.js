// Importando o objeto DataTypes do módulo Sequelize para definir os tipos de dados dos campos do modelo.
const { Sequelize, DataTypes } = require('sequelize');

// Exporta o arquivo de conexão ao banco de dados
const db = require('../db/conn');

// Criando a Tabela 'User' que irá conter dados de funcionários (médicos e recepcionistas)
const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    userCode: {
        type: DataTypes.INTEGER,
        unique: true,
        required: true,
        allowNull: false,
    },
    occupation: DataTypes.STRING
})

module.exports = User