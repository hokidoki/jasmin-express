var express = require('express');
var router = express.Router();
const fs = require('fs');

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
  });

module.exports = router;
