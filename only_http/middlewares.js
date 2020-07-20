const Middleware = () => {
    const _middlewares = [];
    //미들웨어 배열

    const add = fn => {
        _middlewares.push(fn)
        //미들웨어 추가
    }

    
    const run = (req, res) => {
        const _req = req;
        const _res = res;
        //크리티컬 섹션 문제로 인한 req,res 클로저 형성
        const _run = (i, err) => {

            if (i < 0 || i >= _middlewares.length) return;
    
            const nextMw = _middlewares[i] //다음 실행할 미들웨어
            const next = err => _run(i + 1, err) //현재 실행 중인 미들웨어가 종료되고 실행할 미들웨어
            
            
            if (err) {
                //error 미들웨어는 전달인자가 총 4개 
                const isNextErrorMw = nextMw.length === 4
                
                return isNextErrorMw ?
                    nextMw(err, _req, _res, next) :
                    _run(i + 1, err)
            }
            
            if(nextMw._path){
                const pathMatched = _req.url === nextMw._path;
                console.log(_req.url)
                return pathMatched ? nextMw(_req, _res, next) : _run(i + 1)
            }

            nextMw(_req, _res, next);
            
        }

        _run(0);
    }


    return {
        run,
        add,
        _middlewares,
    }
}

module.exports = Middleware;