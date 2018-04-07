/**
 * 来自廖雪峰官方网站的javascript教程
 * 其中加入了了一些自己的理解，做了些修改
 */
try{

//node模块
const fs = require('fs');
//第三方模块
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
//自己的模块
const Routes = require('./middlewares/controller.js');
const {restify} = require('./middlewares/rest.js');
const templating = require('./utils/templating.js');
const {logger} = require('./utils/log4js.js')

//启动服务器时的初始化
const isProduction=process.env.NODE_ENV==='production';//获得当前设备是否是生产环境
let port=process.env.PORT || 3000;
let startTime=new Date().getTime();
console.log('当前环境',process.env.NODE_ENV)
logger.prepareLog(`\n*****服务器开启中，当前环境为 ${process.env.NODE_ENV}*****`);
const routes=Routes();//获得routes
const app = new Koa();

//监听未捕获的异常
process.on('uncaughtException', function (err) {
	logger.uncaughtLog(err);
});

//在app的ctx上绑定render方法，处理模板的渲染
templating(app);

//parse request的body
app.use(bodyParser());

//静态文件管理(因为项目上线时的静态文件是部署在反向代理服务器内，如Ngix，所以需要判断当前运行环境)
if(!isProduction){
	const staticFiles=require('./middlewares/static-files');//引入静态文件管理
	app.use(staticFiles());
}

//在请求路径为/api/的ctx上绑定rest方法
app.use(restify());

//添加路由
app.use(routes);

app.listen(port, function () {
	let endTime=new Date().getTime();
	console.log("app started at port "+port+"...")
	logger.prepareLog(`\n*****服务器启动成功，端口号为 ${port}*****\n*****启动花费 ${(endTime-startTime)/1000} 秒*****`);
});

}catch(err){
	logger.prepareLog(`\n*****服务器启动失败*****`);
	logger.outerLog(err);
}
