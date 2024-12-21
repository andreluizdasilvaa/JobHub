var express = require('express');
var router = express.Router();

// Cadastro PF
router.post('/register', (req, res) => {
    
    var { nome, apelido, cpf, nascimento, tell, email, estado, cidade, senha,  } = req.body;

})

// Cadastro PJ
router.post('/register', (req, res) => {
    
    var { nome, apelido, cnpj, endereco, areaDeAtuação, estado, cidade, senha,  } = req.body;
    
})


module.exports = router;