// app/routes/authRouter.js

var express = require('express');
var router = express.Router();

// 1. IMPORTAÇÃO DO EXPRESS-VALIDATOR
const { check, validationResult } = require('express-validator');

// 2. FUNÇÃO AUXILIAR renderPage
function renderPage(res, template, title, currentPage, data = {}) {
    res.render('pages/' + template, {
        title: title,
        currentPage: currentPage,
        ...data 
    });
}


// REGRAS DE VALIDAÇÃO



const validationRules = [
    // Validação do NOME
    check('nome')
        .notEmpty().withMessage('O nome completo é obrigatório.').bail()
        .isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 3 caracteres.')
        .matches(/^[A-Za-zÀ-ú\s]+$/).withMessage('O nome deve conter apenas letras e espaços.'),
    
    // Validação do EMAIL
    check('email')
        .isEmail().withMessage('O e-mail fornecido é inválido.').bail()
        .normalizeEmail(), 

    // Validação da SENHA
    check('senha')
        .isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.'),

    // Validação do TELEFONE
    check('telefone')
        .notEmpty().withMessage('O telefone é obrigatório.'),
];

// Regras para o LOGIN
const loginRules = [
    // Validação do EMAIL
    check('email')
        .notEmpty().withMessage('O e-mail é obrigatório.').bail()
        .isEmail().withMessage('O e-mail fornecido é inválido.')
        .normalizeEmail(),

    // Validação da SENHA
    check('senha')
        .notEmpty().withMessage('A senha é obrigatória.'),
];


// Regras para REDEFINIR SENHA
const redefinirRules = [
    // Validação do EMAIL
    check('email')
        .notEmpty().withMessage('O e-mail é obrigatório.').bail()
        .isEmail().withMessage('O e-mail fornecido é inválido.')
        .normalizeEmail(),
];


// Regras para FALE CONOSCO (CONTATO)
const contatoRules = [
    // Validação do NOME
    check('nome')
        .notEmpty().withMessage('O nome completo é obrigatório.').bail()
        .isLength({ min: 3 }).withMessage('O nome deve ter no mínimo 3 caracteres.')
        .matches(/^[A-Za-zÀ-ú\s]+$/).withMessage('O nome deve conter apenas letras e espaços.'),
    
    // Validação do EMAIL
    check('email')
        .notEmpty().withMessage('O e-mail é obrigatório.').bail()
        .isEmail().withMessage('O e-mail fornecido é inválido.')
        .normalizeEmail(),

    // Validação do ASSUNTO
    check('assunto')
        .notEmpty().withMessage('O assunto é obrigatório.').bail()
        .isLength({ min: 5 }).withMessage('O assunto deve ter no mínimo 5 caracteres.'),

    // Validação da MENSAGEM
    check('mensagem')
        .notEmpty().withMessage('A mensagem é obrigatória.').bail()
        .isLength({ min: 10 }).withMessage('A mensagem deve ter no mínimo 10 caracteres.'),
];



// ROTAS DE PROCESSAMENTO

// Rota POST para processar o CADASTRO
router.post('/cadastro', validationRules, function(req, res) {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        const fields = req.body;
        
        return renderPage(res, 'cadastro', 'Cadastro - OBSF', 'cadastro', { 
            errors: errors.array(), 
            fields: fields 
        });
    }
    
    res.redirect('/login'); 
});

// Rota POST para processar o LOGIN
router.post('/login', loginRules, function(req, res) {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        const fields = req.body;
        
        return renderPage(res, 'login', 'Login - OBSF', 'login', { 
            errors: errors.array(), 
            fields: fields 
        });
    }

    res.redirect('/');
});


// Rota POST para processar a REDEFINIÇÃO DE SENHA
router.post('/redefinir', redefinirRules, function(req, res) {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        const fields = req.body;

        return renderPage(res, 'redefinir', 'Redefinir Senha - OBSF', 'redefinir', { 
            errors: errors.array(), 
            fields: fields 
        });
    }

    res.redirect('/login'); 
});


// Rota POST para processar o FALE CONOSCO (CONTATO)
router.post('/contato', contatoRules, function(req, res) {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        const fields = req.body;

        return renderPage(res, 'contato', 'Contato - OBSF', 'contato', { 
            errors: errors.array(), 
            fields: fields 
        });
    }

    // Sucesso
    res.redirect('/contato?sucesso=1'); 
});


module.exports = router;