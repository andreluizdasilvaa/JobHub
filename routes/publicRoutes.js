var express = require('express');
const path = require('path');
var router = express.Router();

const { auth_user } = require('../middleware/auth')

router.get('/', (req, res) => {
    const sessionCookie = req.cookies['your-session'];
    if (sessionCookie) {
        return res.redirect('/vagas');
    } 
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});
  
router.get('/terms-of-use-and-privacy-policies', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/TermsAndPlpriv.html'));
});

router.get('/register', (req, res) => {
    const sessionCookie = req.cookies['your-session'];
    if (sessionCookie) {
        return res.redirect('/vagas');
    }
    res.sendFile(path.join(__dirname, '../public/html/register.html'));
});

router.get('/login', (req, res) => {
    const sessionCookie = req.cookies['your-session'];
    if (sessionCookie) {
        return res.redirect('/vagas');
    }
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
});

router.get('/vagas', auth_user, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/dash_vagas.html'));
});

module.exports = router;