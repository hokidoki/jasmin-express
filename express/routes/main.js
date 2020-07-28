var express = require('express');
var router = express.Router();
var isValidAccess = require('./middleware/cookie');
/* GET home page. */
router.get('/', isValidAccess,function(req, res, next) {
    res.render('main')
});

module.exports = router;
