/**
 * 花费记录
 */
const Sequelize = require('sequelize');
const sequelize = require('./db/dbpools');

const CostList = sequelize.define('cost_list', {
	id: {
		type: Sequelize.STRING(50),
		primaryKey: true
	},
	user_id: {
		type: Sequelize.STRING
	},
	cost: {
		type: Sequelize.STRING
	},
	//开销类型(单选)：食物 出行 衣物 医疗 日用品 学习 娱乐 健身 赠礼 电子产品 奢侈品
	cost_type: {
		type: Sequelize.STRING
	},
	//开销对象(多选)： 我 老婆 父母 亲戚 朋友
	cost_target: {
		type: Sequelize.STRING
	},
	//开销备注
	cost_remarks: {
		type: Sequelize.STRING
	}
})


module.exports = CostList;