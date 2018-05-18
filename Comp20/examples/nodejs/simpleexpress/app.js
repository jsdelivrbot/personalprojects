// Taken from http://expressjs.com/4x/api.html
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); // Required if we need to use HTTP post parameters
// See https://stackoverflow.com/questions/5710358/how-to-get-post-query-in-express-node-js
app.use(bodyParser.json());
// See https://stackoverflow.com/questions/25471856/express-throws-error-as-body-parser-deprecated-undefined-extended
app.use(bodyParser.urlencoded({ extended: true })); // Required if we need to use HTTP post parameters

app.get('/', function(request, response) {
	response.send("Hello world");
});

app.get('/pikachu', function(request, response) {
	console.log(request);
	response.send("You've won the game!");
});

app.post('/sendLocation', function(request, response) {
	var theLogin = request.body.login;
	var theLat = request.body.lat;
	var theLng = request.body.lng;
	var returnObject = {"login":theLogin,"lat":theLat,"lng":theLng};
	response.send(returnObject);
});

// Oh joy! http://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of
app.listen(process.env.PORT || 8888);