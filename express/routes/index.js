var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  // console.log(__dirname)
 
  fs.readFile('./public/main/login.html','UTF-8',(err,data)=>{
    if(err){
      next(err);
      return;
    }
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end(data);
  })
});

module.exports = router;
