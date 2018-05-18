var express = require('express');
var app = express();

app.get('/', function (request, response){
		response.send("Hello World");
		});

app.get('/pikachu', function (request, response){
		response.send("All about pikachu is here");
		});

app.listen(process.env.PORT || 8888);
