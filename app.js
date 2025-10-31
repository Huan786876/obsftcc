// app.js (MODIFICADO)

const express = require('express');
const app = express();
const dotenv = require("dotenv").config();

// 1. IMPORTAÇÃO DAS ROTAS (CORREÇÃO DO ERRO)
// Importação simples (não desestruturada)
const mainRouter = require('./app/routes/mainRouter'); 
const authRouter = require('./app/routes/authRouter'); 

// ... (Resto do app.js é mantido, como o middleware e app.use)

app.set('view engine', 'ejs');
app.set('views', 'app/views');
app.use(express.static('app/public'));

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use('/', mainRouter); 
app.use('/', authRouter);

// 5. INICIALIZAÇÃO DO SERVIDOR
const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
    console.log(`Servidor online\nHttp://localhost:${PORT}`);
});