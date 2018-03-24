const fs = require('fs');
const path=require('path');

const router = require('koa-router')();
const {rootPath}=require('../utils/common');

function addMapping(mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
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
        //console.log(`process controller: ${f}...`);
        let mapping = require(path.resolve(filesPath,f));
        addMapping(mapping);
    }
}

module.exports = (function () {
    let filesPath=path.resolve(rootPath,'controllers');
    addControllers(filesPath);
    return router.routes();
}());

