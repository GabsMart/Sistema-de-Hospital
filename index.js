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

// Adiciona a pasta 'public', que irá conter arquivos estáticos de estilização como css e imagens
app.use(express.static('public'));

// Importa o arquivo de conexão ao banco de dados
const conn = require('./db/conn');

// Modelo User
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Login de Usuário. Página Principal
app.get('/', (req,res) => {
    res.render('main', {layout: 'users'});
})

// Sincronizando o modelo com o banco de dados usando o método "sync()" do objeto "conn" (instância do Sequelize).
conn
    .sync()
    .then(() => {
        // Iniciando o servidor Express para ouvir na porta 3000 após a sincronização bem-sucedida.
        app.listen(3000);
    })
    .catch((error) => {
        // Lidando com erros em caso de falha na sincronização ou ao iniciar o servidor.
        console.log(error);
    })