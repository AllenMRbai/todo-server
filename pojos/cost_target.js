/**
 * 开销类型（默认）：食物 出行 衣物 医疗 日用品 学习 娱乐 健身 赠礼 电子产品 奢侈品
 * 后期用户可自定义
 */
const Sequelize=require('sequelize');
const sequelize=require('./db/dbpools');

const CostTarget=sequelize.define('cost_target',{
	id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    user_id:{
		type:Sequelize.STRING
	},
    //开销对象(多选)： 我 老婆 父母 亲戚 朋友
	cost_target:{
		type:Sequelize.STRING
    }
})


module.exports=CostTarget;