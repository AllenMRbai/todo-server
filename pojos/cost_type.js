/**
 * 开销类型（默认）：食物 出行 衣物 医疗 日用品 学习 娱乐 健身 赠礼 电子产品 奢侈品
 * 后期用户可自定义
 */
const Sequelize=require('sequelize');
const sequelize=require('./db/dbpools');

const CostType=sequelize.define('cost_type',{
	id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
		type:Sequelize.STRING
	},
    //开销类型(单选)：食物 出行 衣物 医疗 日用品 学习 娱乐 健身 赠礼 电子产品 奢侈品
	cost_type:{
		type:Sequelize.STRING
    }
})


module.exports=CostType;