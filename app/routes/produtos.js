module.exports = function(app){
	var lista = function(request, response){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		 produtosDAO.lista(function(err, result){
			 response.format({
				 html: function(){
						response.render('produtos/lista', {lista: result});

					},
				json: function(){
						response.json(result);
					}
			 });
		});
		connection.end();
	};

	app.get('/produtos', lista);

	app.get('/produtos/form', function(request, response){
		response.render('produtos/form', {errosValidacao:{}, produto:{}});
	});

	app.post('/produtos/salva', function(request, response){
		var produto = request.body;
		
		request.assert('titulo', 'Titulo é obrigatório').notEmpty();
		request.assert('preco', 'Preço precisa ser Float').isFloat();

		var erros = request.validationErrors();

		if(erros){
			response.render('produtos/form', {errosValidacao: erros, produto:produto});
			return;
		}

		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);



		produtosDAO.salva(produto, function(erros, resultado){
			response.redirect('/produtos');
		});
	});
}
