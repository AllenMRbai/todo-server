function APIError (code, message) {
    this.code = code || 'internal:unknown_error';
    this.message = message || '';
}

function restify (pathPrefix){
    pathPrefix = pathPrefix || '/api/';
    return async (ctx, next) => {
        if (ctx.request.path.startsWith(pathPrefix)) {
            // 绑定rest()方法:
            ctx.rest = (data) => {
                ctx.response.type = 'application/json';
                ctx.response.body = data;
            }
            try {
                await next();
            } catch (err) {
                if(err instanceof Error){
                    //如果是继承自Error，就打印到日志
                    global.logger.routeLog(err)
                }

                // 这里是统一的rest返回错误:
                ctx.response.status = 400;
                ctx.response.type = 'application/json';
                ctx.response.body = {
                    code: err.code || 'internal:unknown_error',
                    message: err.message || 'unknown internal error'
                };
            }
        } else {
            try{
                await next();
            }catch(err){
                global.logger.routeLog(err);
            }
            
        }
    };
}

module.exports = {
    APIError,
    restify
};