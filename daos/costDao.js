const Sequelize=require('sequelize');
const sequelize=require('../pojos/db/dbpools');
const cost_list=require('../pojos/cost_list');
const cost_target=require('../pojos/cost_target');
const cost_type=require('../pojos/cost_type');

const userDao={
    async addCost(userName){
        // let users=await User.findAll({
        //     where:{
        //         user_name:userName
        //     }
        // })
        // if(users){
        //     return users[0].dataValues;
        // }
        // return false
    }
}

module.exports=userDao;