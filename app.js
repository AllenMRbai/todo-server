/**
 * 来自廖雪峰官方网站的javascript教程
 * 其中加入了了一些自己的理解，做了些修改
 */

//node模块
const fs = require('fs');
//第三方模块
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
//自己的模块
const routes = require('./middlewares/controller.js');
const {restify} = require('./middlewares/rest.js');
const templating = require('./utils/templating.js');

const isProduction=process.env.NODE_ENV==='production';//获得当前设备是否是生产环境
console.log('当前环境',process.env.NODE_ENV)

const app = new Koa();

//在app的ctx上绑定render方法，处理模板的渲染
templating(app);

//parse request的body
app.use(bodyParser());

//在请求路径为/api/的ctx上绑定rest方法
app.use(restify());

//静态文件管理(因为项目上线时的静态文件是部署在反向代理服务器内，如Ngix，所以需要判断当前运行环境)
if(!isProduction){
	const staticFiles=require('./middlewares/static-files');//引入静态文件管理
	app.use(staticFiles());
}

//添加路由
app.use(routes);

app.listen(3000, function () {
    console.log("app started at port 3000...")
});