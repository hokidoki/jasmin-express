var express = require('express');
const { json } = require('express');
const mysql = require('../db/mysql').init();
var router = express.Router();
var isValidAccess = require('./middleware/cookie').default;
/* GET home page. */
router.get('/', isValidAccess, function (req, res, next) {
    mysql.query('call get_article(1,0,10)', (err, result) => {
        if(err){
            next(new Error("문제가 발생하였습니다."));
            return;
        }
        console.log(result)
        res.render('main', {
            articleList : result[0],
            _latestNo : result[0].length ? result[0][result[0].length -1].No : 0,
            getArticleFunc : `getArticle(latestNo)`
        })
    })
});

module.exports = router;
