var express = require('express');
var router = express.Router();
const isValidAccess = require('./middleware/cookie').default;
const mysql = require('../db/mysql').init();

router.post('/',isValidAccess,function (req,res,next){
    mysql.query(`call new_article('${req.body.article}','${req.cookies.express}')`,(err,result)=>{
        if(err){
            next(new Error("글 쓰기 생성에 실패하였습니다."));
            return;
        }

        res.send(result[0]);
    })
})


module.exports = router;

