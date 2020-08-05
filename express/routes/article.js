var express = require('express');
var router = express.Router();
const isValidAccess = require('./middleware/cookie').default;
const mysql = require('../db/mysql').init();

router.post('/', isValidAccess, function (req, res, next) {
    mysql.query(`call new_article('${req.body.article}','${req.cookies.express}')`, (err, result) => {
        if (err) {
            next(new Error("글 생성에 실패하였습니다."));
            return;
        }

        res.send(result[0]);
    })
})

router.get('/', isValidAccess, function (req, res, next) {
    mysql.query(`call get_article(false,${!isNaN(req.query.from) ? Number(req.query.from) : 'null'},
    ${!isNaN(req.query.to) ? Number(req.query.to) : 'null'},
    ${!isNaN(req.query.limit) ? Number(req.query.limit) : 'null'})`, (err, result) => {
        if(err){
            console.log(err);
            next(new Error("문제가 발생하였습니다."));
            return;
        }
        res.send(result[0])
    })
})

module.exports = router;

