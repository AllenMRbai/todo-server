/**
 * 创建一个空的表，如果已存在该表，先drop掉。
 * 所以请谨慎使用
 */
const Sequelize=require('sequelize');
const sequelize=require('../db/dbpools.js');
const User=require('../User');
const CostList=require('../cost_list')
const CostType=require('../cost_type')
const CostTarget=require('../cost_target')

let canDrop=true;

if(canDrop){
    // createUser()
    // createCostList()
    // createCostType()
    // createCostTarget()
}

//如果存在user表，先drop掉再生成一个表
function createUser(){

	User.sync({force:true}).then(()=>{
		//添加一个表需要插入一行
		return User.create({
			user_name:"123"
		});
	}).then(()=>{
		//将建表时插入的一行删除
		return User.destroy({
				where:{
					user_name:"123"
				}
			})
	}).then(affectedRows => {
		console.log("删除条数为："+affectedRows);
	});

}

function createCostList(){

	CostList.sync({force:true}).then(()=>{
		//添加一个表需要插入一行
		return CostList.create({
			id:"123"
		});
	}).then(()=>{
		//将建表时插入的一行删除
		return CostList.destroy({
				where:{
					id:"123"
				}
			})
	}).then(affectedRows => {
		console.log("删除条数为："+affectedRows);
	});

}

function createCostType(){

	CostType.sync({force:true}).then(()=>{
		//添加一个表需要插入一行
		return CostType.create({
			id:1
		});
	}).then(()=>{
		//将建表时插入的一行删除
		return CostType.destroy({
				where:{
					id:1
				}
			})
	}).then(affectedRows => {
		console.log("删除条数为："+affectedRows);
	});

}

function createCostTarget(){

	CostTarget.sync({force:true}).then(()=>{
		//添加一个表需要插入一行
		return CostTarget.create({
			id:1
		});
	}).then(()=>{
		//将建表时插入的一行删除
		return CostTarget.destroy({
				where:{
					id:1
				}
			})
	}).then(affectedRows => {
		console.log("删除条数为："+affectedRows);
	});

}

