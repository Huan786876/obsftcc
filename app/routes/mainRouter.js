// app/routes/mainRouter.js

var express = require('express');
var router = express.Router();

// --------------------------------------------------------------------------------
// FUNÇÃO AUXILIAR renderPage (Para evitar erros de ReferenceError)
// --------------------------------------------------------------------------------
function renderPage(res, template, title, currentPage, data = {}) {
    // Presumimos que suas views EJS estão em 'app/views/pages/'
    res.render('pages/' + template, {
        title: title,
        currentPage: currentPage,
        ...data 
    });
}
// --------------------------------------------------------------------------------


// --------------------------------------------------------------------------------
// ROTAS DE EXIBIÇÃO
// --------------------------------------------------------------------------------


router.get('/', function(req, res) {
    
    renderPage(res, 'index', 'OBSF - Início', 'index'); 
});

router.get('/sobrenos', function(req, res) {
    
    renderPage(res, 'sobrenos', 'Sobre Nós - OBSF', 'sobrenos');
});

router.get('/projetos', function(req, res) {
    
    renderPage(res, 'projetos', 'Projetos - OBSF', 'projetos');
});

router.get('/como-ajudar', function(req, res) {
    
    renderPage(res, 'como-ajudar', 'Como Ajudar - OBSF', 'como-ajudar');
});

router.get('/lojinha', function(req, res) {
    
    renderPage(res, 'lojinha', 'Lojinha - OBSF', 'lojinha');
});

router.get('/contato', function(req, res) {
    
    renderPage(res, 'contato', 'Contato - OBSF', 'contato', { errors: [], fields: {} });
});


// --------------------------------------------------------------------------------
// ROTAS GET DE AUTENTICAÇÃO
// --------------------------------------------------------------------------------

router.get('/login', function(req, res) {
    // Renderiza o arquivo login.ejs
    renderPage(res, 'login', 'Login - OBSF', 'login');
});





router.get('/cadastro', function(req, res) {

    renderPage(res, 'cadastro', 'Cadastro - OBSF', 'cadastro', { 
        errors: [], 
        fields: {} 
    });
});



router.get('/redefinir', function(req, res) {
    // Renderiza o arquivo redefinir.ejs
    renderPage(res, 'redefinir', 'Redefinir Senha - OBSF', 'redefinir');
});



router.get('/contato', function(req, res) {
    
    renderPage(res, 'contato', 'Contato - OBSF', 'contato', { errors: [], fields: {} });
});


module.exports = router;