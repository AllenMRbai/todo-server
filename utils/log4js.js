const log4js = require('log4js');

log4js.configure({
  appenders: { 
  	route:{//controller内每个路由的日志
      type:'file',
      filename:'log/route.log',
      // alwaysIncludePattern:true,
      // pattern: "-yyyy-MM-dd-hh.log"//每小时生成一个log文件，并以这个格式为结尾。但貌似没用，注释了。
    },
    uncaughtException:{//全局未捕获的异常
      type:'file',
      filename:'log/uncaughtException.log',
    },
    prepare:{//每次重启服务器的前置准备
      type:'file',
      filename:'log/prepare.log',
    },
    outer:{//应用最外层包裹的log文件
      type:'file',
      filename:'log/outer.log',
    }
  },
  categories: { 
    default: { appenders: ['route'], level: 'debug' } ,
    uncaughtException:{appenders: ['uncaughtException'], level: 'all'},
    prepare:{appenders: ['prepare'], level: 'all'},
    outer:{appenders: ['outer'], level: 'all'},
  }
});

const route_logger = log4js.getLogger();
const uncaughtException_logger = log4js.getLogger('uncaughtException');
const prepare_logger=log4js.getLogger('prepare');
const outer_logger=log4js.getLogger('outer');

const logger={description:'this is logger'};
logger.routeLog=function(err){
  route_logger.error(err);
}
logger.uncaughtLog=function(err){
  uncaughtException_logger.error(err);
}
logger.prepareLog=function(str){
  prepare_logger.trace(str);
}
logger.outerLog=function(err){
  outer_logger.error(err);
}

global.logger=logger;

module.exports={
  route_logger,
  uncaughtException_logger,
  prepare_logger,
  outer_logger,
  logger
}

// level
//ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF
//使用方法如下
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');