const path=require('path');
const fs=require('fs');

//获得项目根目录的绝对路径
const rootPath=path.resolve(__dirname,'../');

//将fs的异步回调方法改为Promise，方便在async函数内 await方式调用
const myfs={}
myfs.readFile=function(path,options){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,options,function(err,data){
            if(err){
                reject(err);
            }else{
                resolve(data);
            }
        })
    })
}
myfs.exists=function(path){
    return new Promise((resolve,reject)=>{
        fs.exists(path,function(exists){
            resolve(exists);
        })
    })
}

module.exports={
    rootPath,
    myfs
}