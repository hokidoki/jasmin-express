module.exports = {
    default : function (req,res,next){
        if(req.cookies.express){
            next();
        }else{
            next(new Error("비정상 적인 경로입니다."))
        }
    },
    mainAccess : function (req,res,next){
        console.log(req.cookies.express)
        if(req.cookies.express){
            res.redirect('/main');
        }else{
            next();
        }
    }
} 