var express = require('express');
const path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/home.html'));
});

router.get('/terms-of-use-and-privacy-policies', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/TermsAndPlpriv.html'));
});

router.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/html/'))
})

module.exports = router;