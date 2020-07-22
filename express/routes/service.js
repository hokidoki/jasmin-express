var express = require('express');
var router = express.Router();
const fs = require('fs');
const mysql = require('../db/mysql').init();


/* GET home page. */
router.get('/join', function(req, res, next) {
  fs.readFile('./public/main/join.html','UTF-8',(err,data)=>{
    if(err){
      next(err);
      return;
    }
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  })
});

router.post('/join', function(req, res, next) {
    console.log(req.body);
    try{
      mysql.query(`insert into account(id,pw,email) values('${req.body.id}','${req.body.password_1}','${req.body.email}')`,(result,err)=>{
        console.log(result,err);
      });
    }catch(e){
      console.log(e);
    }
    
    res.send("OK")
  });

module.exports = router;
