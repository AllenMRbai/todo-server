const userDao=require('../daos/userDao')
const {APIError}=require('../middlewares/rest')

const userService={
    async signIn(ctx,userName,password){
        let user=await userDao.getUser(userName)
        if(user){
            return user.user_password===password
        }
        return false;
    },
    async getUser(ctx,userName){
        let user=await userDao.getUser(userName)
        if(user){
            return user;
        }else{
            throw new APIError('data:not_find', '改用户不存在')
        }
    }
}


module.exports=userService;