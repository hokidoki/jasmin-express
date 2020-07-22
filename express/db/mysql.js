var mysql = require('mysql');
var config = require('./config')
module.exports = (function(config){
    return {
        init : function(){
            return mysql.createConnection({
                host : config.host,
                port : config.port,
                user : config.user,
                password : config.password,
                database : config.database
            })
        },
        test_open : function (){
            this.init().connect(function(err){
                if(err){
                    console.log("mysql connection error" + err);
                }else{
                    console.log("mysql is connected successfully");
                }
            })
        }
    }
})(config.local)