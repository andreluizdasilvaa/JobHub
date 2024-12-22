require('dotenv').config();

// dependencia
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');

// middleware
const errorHandler = require('./middleware/errorHandler.js')

// Realiza o login/cadastro do usuários pf/pj
var authRoutes = require('./routes/authRoutes');
// servir as páginas estáticas .html
var publicRoutes = require('./routes/publicRoutes');
// Realiza a consulta para o Dashboard do administrador. ADM
var dashboard = require('./routes/dashboard');
// Retorna as informações do usuário pg/perfil
var userRoutes = require('./routes/userRoutes.js');
// Realiza a consulta de vagas no DB + tratamento + paginação.
var hubRoutes = require('./routes/hubRoutes.js');
// Envia a página de login para administradores.
var adminRoutes = require('./routes/adminRoutes.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler)

app.use('/', publicRoutes);
app.use('/api', authRoutes, hubRoutes, userRoutes, dashboard, adminRoutes);


module.exports = app;