var express = require('express');
var router = express.Router();
const fs = require('fs');
const mysql = require('../db/mysql').init();

const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault('Asia/Seoul');


router.post('/login',function (req,res,next){
  const expires = moment().add(1,'hours').format('ddd, DD MMM YYYY HH:mm:ss')+' GMT';
  mysql.query(`call jasmin_express.login('${req.body.id}','${req.body.pw}')`,(err,result)=>{
    if(err){
      res.status(403).render('error');
      return;
    }

    if(result[0][0].isValid){
      res.cookie('express',`${req.body.id}`,{
        Expires : expires
      }).send("성공")
    }else{
      res.send("비밀번호와 아이디를 확인해주세요");
    }
  })
})

/* GET home page. */
router.post('/login',function(req,res,next){
  
});

router.get('/join', function (req, res, next) {
  fs.readFile('./public/main/join.html', 'UTF-8', (err, data) => {
    if (err) {
      next(err);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  })
});

router.post('/join', function (req, res, next) {
  mysql.query(`call jasmin_express.join('${req.body.id}','${req.body.password_1}','${req.body.email}')`, (err, result) => {
    if (err) {
      console.log(err);
      next(err);
      return;
    }
    
    if(result[0][0].status){
      
      res.status(202).send("id already used");
    }else{
      res.status(201).send("OK");
    }
  });
});

module.exports = router;
