var mysql = require('mysql');

var connectMYSQL = function(){
	return mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '123456',
			database : 'casadocodigo_nodejs'
		});
}


module.exports = function(){
	return connectMYSQL;
}