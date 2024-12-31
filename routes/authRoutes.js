const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
var express = require('express');

var router = express.Router();
const prisma = new PrismaClient();

const { auth_user, generate_token_user, remove_session} = require('../middleware/auth')

// Cadastro PF
router.post('/pf/register', async (req, res, next) => {
    try {
        var {
             nome, 
             apelido, 
             cpf, 
             nascimento, 
             telefone, 
             email, 
             estado, 
             cidade, 
             senha,  
            } = req.body;

        // verifica se o cpf || email || apelido já existe
        const existUser = await prisma.userPf.findFirst({
            where: {
                OR: [
                    { cpf: cpf },
                    { email: email },
                    { apelido: apelido }
                ]
            }
        });
        
        if (existUser) {
            let conflictField;
        
            if (existUser.cpf === cpf) {
                conflictField = 'CPF';
            } else if (existUser.email === email) {
                conflictField = 'Email';
            } else {
                conflictField = 'Apelido';
            }
        
            return res.status(409).json({ inp_err_msg: `${conflictField}` });
        }
        
        const hashedPassword  = await bcrypt.hash(senha, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        const createUser = await prisma.userPf.create({
            data: {
                nome,
                apelido,
                cpf,
                email,
                nascimento: new Date(nascimento),
                senha: hashedPassword,
                cidade,
                estado,
                telefone
            }
        });

        res.status(201).json({ msg: "Sucess"});

    } catch (error) {
        next(error);
    }
})  

// Cadastro PJ
router.post('/pj/register', async (req, res, next) => {
    try {
        var { nome, 
            apelido, 
            cnpj, 
            endereco, 
            area_atuacao, 
            estado, 
            cidade, 
            senha, 
            email  
            } = req.body;

        // verifica se o cnpj || email || apelido já existe
        const existUser = await prisma.userPJ.findFirst({
            where: {
                OR: [
                    { cnpj: cnpj },
                    { email: email },
                    { apelido: apelido }
                ]
            }
        });
        
        if (existUser) {
            let conflictField;
        
            if (existUser.cnpj === cnpj) {
                conflictField = 'cnpj';
            } else if (existUser.email === email) {
                conflictField = 'Email';
            } else {
                conflictField = 'Apelido';
            }
        
            return res.status(409).json({ inp_err_msg: `${conflictField}` });
        }
        
        const hashedPassword  = await bcrypt.hash(senha, parseInt(process.env.BCRYPT_SALT_ROUNDS));

        const createUser = await prisma.userPJ.create({
            data: {
                nome,
                apelido,
                cnpj,
                endereco,
                area_atuacao,
                email,
                senha: hashedPassword,
                cidade,
                estado,
            }
        });

        res.status(201).json({ msg: "Sucess"});
        
    } catch (error) {
        next(error)
    }
});

// Login PF e PJ
router.post('/login', async (req, res, next) => {
    try {
        const { mail, senha } = req.body;

        // Verifica se o email existe em userPf ou userPJ
        const userPF = await prisma.userPf.findFirst({ where: { email: mail } });
        const userPJ = await prisma.userPJ.findFirst({ where: { email: mail } });

        if (!userPF && !userPJ) {
            return res.status(404).json({ error: "E-mail não encontrado." });
        }

        // Obtém o usuário encontrado
        const user = userPF || userPJ;

        // Verifica a senha
        const passwordMatch = await bcrypt.compare(senha, user.senha);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Senha incorreta." });
        }

        // Gere o token e configure o cookie
        generate_token_user(user, req, res, () => {
            res.status(201).redirect('/vagas')
        });

    } catch (error) {
        next(error)
    }
})

module.exports = router;