const {APIError}=require('../../middlewares/rest')
const userService=require('../../services/userService')

//登录
const signIn = async (ctx, next) => {
    let userName = ctx.params.userName;
    let password = ctx.params.password;

    let result=await userService.signIn(ctx,userName,password)
    if(result){
        ctx.rest({result})
    }else{
        throw new APIError('auth:auth_not_pass', '用户名或密码错误');
    }
};

const getUser = async (ctx, next) => {
    let userName = ctx.params.userName;

    let result=await userService.getUser(ctx,userName)
    if(result){
        ctx.rest(result)
    }else{
        throw new APIError('data:not_find', '用户名或密码错误');
    }
};

//注册
// const signUp = async (ctx, next) => {
//     let userName = ctx.params.userName;
//     let password = ctx.params.password;    
// };


module.exports = {
    'GET /api/signIn/:userName/:password': signIn,
    'GET /api/user/:userName': getUser,
    //'post /api/signUp': signUp,
};