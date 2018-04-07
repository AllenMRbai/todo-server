const Sequelize=require('sequelize');
const config=require('./config');

var sequelize=new Sequelize(config.database,config.username,config.password,{
	host:config.host,
	dialect:'mysql',
	pool:{
		max:5,
		min:0,
		idle:30000
	},
	define: {
		underscored:true,
		charset:'utf8mb4'
	 }
});

// 测试是否能链接服务器
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports=sequelize;