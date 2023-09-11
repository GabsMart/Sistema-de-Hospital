// Obtém os pacotes do Express e configura a aplicação app
const express = require('express');
const app = express();

// Obtém os pacotes do Handlebars
const exphbs = require('express-handlebars');

// Configura o express para usar o mecanismo de templates de vizualização.
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Essa configuração é necessária para ler os dados inseridos pelo usuário no Form.
app.use(
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json());

// Importa o arquivo de conexão ao banco de dados
const conn = require('./db/conn');

// Cria a porta de servidor local. Será alterado futuramente
app.listen(3000);