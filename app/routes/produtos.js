module.exports = function(app){
	app.get('/produtos', function(request, response){
		var mysql = require('mysql');
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : '',
			database : 'casadocodigo_nodejs'
		});

		connection.query('select * from livros', function(err, result){
			response.send(result);
		});



		connection.end();
	});
}
