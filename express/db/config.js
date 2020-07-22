module.exports = (function(){
    return {
        local : {
            host : 'localhost',
            port : '3306',
            user : 'root',
            password : 'gozld123',
            database : 'jasmin_express',
        },
        real : {
            host : '',
            port : '',
            user : '',
            password : '',
            database : '',
        },
        dev : {
            host : '',
            port : '',
            user : '',
            password : '',
            database : '',
        }
    }
})();