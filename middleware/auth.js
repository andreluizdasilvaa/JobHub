const { PrismaClient } = require('@prisma/client');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

const prisma = new PrismaClient();

function generate_token_user(user, req, res, next) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Envia o token como um cookie válido por uma hora, e só será acessado pelo servidor.
    res.cookie('your-session', token, { httpOnly: true, maxAge: 3600000 });
    next();
}

async function auth_user(req, res, next) {
    const token = req.cookies['your-session'];

    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log(`${err} - ${err.message}`);
            return res.redirect('/login');
        }

        // Verifica se o ID do usuário decodificado existe no banco de dados
        try {
            // Verifica se o id existe em userPf ou userPJ
            const userPF = await prisma.userPf.findFirst({ where: { id: decoded.id } });
            const userPJ = await prisma.userPJ.findFirst({ where: { id: decoded.id } });

            if (!userPF && !userPJ) {
                return res.clearCookie('your-session', { path: '/' }).redirect('/login');
            }

            req.user = decoded;
            next();
        } catch (dbError) {
            console.error('Erro ao verificar usuário no banco de dados:', dbError);
        } 
    });
}

// Função para encerrar a sessão
function remove_session(req, res) {
    try {
        res.clearCookie('your-session', { path: '/' });
        res.status(200).json({ message: 'Sessão encerrada!' });
    } catch (error) {
        console.error('Erro ao encerrar sessão do user, Erro: ', error);
        res.status(500).json({ message: 'Erro interno ao encerrar sessão, entre em contato com o suporte' });
    }
}

module.exports = { auth_user, generate_token_user, remove_session };