const Sequelize=require('sequelize');
const sequelize=require('../pojos/db/dbpools');
const User=require('../pojos/User');

const userDao={
    async getUser(userName){
        let users=await User.findAll({
            where:{
                user_name:userName
            }
        })
        if(users){
            return users[0].dataValues;
        }
        return false
    }
}

module.exports=userDao;