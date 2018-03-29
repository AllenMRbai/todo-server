const Sequelize=require('sequelize');
const sequelize=require('./db/dbpools');

const User=sequelize.define('user',{
	user_name:{
		type:Sequelize.STRING(50),
		primaryKey:true
	},
	user_password:{
		type:Sequelize.STRING
	},
	user_email:{
		type:Sequelize.STRING(50),
		unique:true
	},
	nick_name:{
		type:Sequelize.STRING(50),
		unique:true
	}
})


module.exports=User;