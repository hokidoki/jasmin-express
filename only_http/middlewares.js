const Middleware = () => {
    const _middlewares = [];

    const add = fn => {
        _middlewares.push(fn)
    }

    
    const run = (req, res) => {
        const _req = req;
        const _res = res;

        const _run = (i, err) => {

            if (i < 0 || i >= _middlewares.length) return;
    
            const nextMw = _middlewares[i]
            const next = err => _run(i + 1, err)
    
            nextMw(_req, _res, next);
    
            if (err) {
                const isNextErrorMw = nextMw.length === 4
    
                return isNextErrorMw ?
                    nextMw(err, _req, _res, next) :
                    _run(i + 1, err)
            }
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