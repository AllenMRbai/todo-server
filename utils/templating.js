/**
 * 实例化一个nunjucks.Environment，
 * 并在ctx绑定render方法，用来处理模板字符串的渲染
 */
const path = require('path');
const nunjucks = require('nunjucks')
const isProduction=process.env.NODE_ENV==='production';//获得当前设备是否是生产环境

function createEnv(path, opts) {
    let
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f])
        }
    }
    return env;
}

//把koa的实例传入
function templating(app) {
    //配置
    let path='views', 
        opts={//nunjucks的配置信息
            noCache: !isProduction,//是否缓存模板到内存了。在生产环境为了防止重复读取模板文件，需要将模板缓存到内存中
            watch: !isProduction
        };

    let env = createEnv(path, opts);
    app.context.render = function (view, model) {
        return env.render(view, model);
    }
}

module.exports = templating;