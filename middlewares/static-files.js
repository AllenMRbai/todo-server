const path=require('path');
const mime=require('mime');
const {rootPath,myfs}=require('../utils/common');

function staticFiles(url,dir){
	url= url || '/static/';
	dir=dir || path.resolve(rootPath,'static');
	return async (ctx,next)=>{
		let rpath=ctx.request.path,
			fpath=path.join(dir,rpath.substring(url.length));
		if(rpath.startsWith(url)){
			if(await myfs.exists(fpath)){
				ctx.response.body=await myfs.readFile(fpath);
				ctx.response.type=mime.getType(rpath);
			}else{
				ctx.response.status=404;
			}
		}else{
			await next();
		}
	};
}


module.exports=staticFiles;