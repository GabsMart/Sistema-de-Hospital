// Obtém os pacotes do Express e configura a aplicação app
const express = require('express');
const app = express();

// Pacote de Session, para manter a sessão do usuário logada. Depois, o pacote de File Store que servirá para salvar os arquivos do session
const session = require('express-session')
const FileStore = require('session-file-store')(session);

// Obtém os pacotes do Handlebars
const exphbs = require('express-handlebars');

// Pacote de Mensagens Flash
const flash = require("express-flash");

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

// Session será usado para salvar o login do usuário no sistema
app.use(
    session({
        name: 'session',
        secret: 'nosso_secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function(){},
            // Local onde as sessões serão salvas (pasta sessions)
            path: require('path').join(require('os').tmpdir(), 'sessions'),
        }),
        cookie: {
            secure: false,
            maxAge: 360000, // Um dia
            expires: new Date(Date.now() + 360000), // Expira em um dia
            httpOnly: true
        }
    }),
)

// Verifica se o usuário está logado e salva os dados numa resposta (res)
app.use((req, res, next) => {
    // Verifica se o usuário está logado
    if (req.session.userid) {
        // Se o usuário está logado, manda os dados dele (req) para a resposta (res)
        res.locals.session = req.session
    }

    next();
})

// Mensagens Flash
app.use(flash())

// Adiciona a pasta 'public', que irá conter arquivos estáticos de estilização como css e imagens
app.use(express.static('public'));

// Importa o arquivo de conexão ao banco de dados
const conn = require('./db/conn');

// Area 'Create' se refere a login, registro e página de espera.
const authRoutes = require('./routes/authRoutes')
app.use('/', authRoutes)

// Página 404
app.use(function(req, res) {
    res.status(404).render(`404.handlebars`, {layout: 'auth'})
})

// Sincronizando o modelo com o banco de dados usando o método "sync()" do objeto "conn" (instância do Sequelize).
conn
    .sync()
    //.sync({force: true})
    .then(() => {
        // Iniciando o servidor Express para ouvir na porta 3000 após a sincronização bem-sucedida.
        app.listen(3000);
    })
    .catch((error) => {
        // Lidando com erros em caso de falha na sincronização ou ao iniciar o servidor.
        console.log(error);
    })