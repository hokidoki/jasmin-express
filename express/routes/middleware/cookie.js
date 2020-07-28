module.exports = function (req,res,next){
    if(req.cookies.express){
        next();
    }else{
        next(new Error("비정상 적인 경로입니다."))
    }
}