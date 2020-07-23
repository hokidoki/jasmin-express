var express = require('express');
var router = express.Router();
const fs = require('fs');
const mysql = require('../db/mysql').init();


/* GET home page. */
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
    console.log(result);
    if(result[0][0].status){
      res.status(202).send("id already used");
    }else{
      res.status(201).send("OK");
    }
  });
});

module.exports = router;
