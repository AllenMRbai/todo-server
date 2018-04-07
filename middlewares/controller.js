const fs = require('fs');
const path=require('path');

const router = require('koa-router')();
const {rootPath}=require('../utils/common');
const {logger}=require('../utils/log4js');

function addMapping(mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            logger.prepareLog(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            logger.prepareLog(`register URL mapping: POST ${path}`);
        }else if (url.startsWith('PUT ')) {
            var path = url.substring(4);
            router.put(path, mapping[url]);
            logger.prepareLog(`register URL mapping: PUT ${path}`);
        }else if (url.startsWith('DELETE ')) {
            var path = url.substring(7);
            router.del(path, mapping[url]);
            logger.prepareLog(`register URL mapping: DELETE ${path}`);
        } else {
            logger.prepareLog(`invalid URL: ${url}`);
        }
    }
}

function addControllers(filesPath) {
    let files = fs.readdirSync(filesPath);
    let js_files = files.filter((f) => {
        let fPath=path.resolve(filesPath,f);
        if(fs.statSync(fPath).isDirectory()){
            addControllers(fPath)     
        }
        return f.endsWith('.js');
    });

    for (let f of js_files) {
        let mapping = require(path.resolve(filesPath,f));
        addMapping(mapping);
    }
}

module.exports = (function () {
    let filesPath=path.resolve(rootPath,'controllers');
    addControllers(filesPath);
    return router.routes();
});

