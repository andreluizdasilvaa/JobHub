var express = require('express');
const path = require('path');
var router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});
  
router.get('/terms-of-use-and-privacy-policies', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/TermsAndPlpriv.html'));
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/register.html'));
});

module.exports = router;