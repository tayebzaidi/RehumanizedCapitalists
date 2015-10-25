console.log("Deloying EatEasy server...");

//Load Dependencies
var http 	= require('http');
var url = require('url');
var fs = require('fs');
var util = require('util');

var server = http.createServer(requestHandler);
server.listen(1337);
console.log("Server Deployed.");

//Main Request Handler
function requestHandler(req, res) {
	console.log("Request recieved.");
	handleApiRequest(req, res);
}

function handleApiRequest(req, res) {
	console.log("Made it to API Request Handler!")
	if(req.method == "GET") {
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		console.log(query);
		if(query.recipe == undefined) {
			replyMissingRecipe(res);
			return;
		}
		requestRecipes(req, res, query);
	} else {
		replyPostNotSupported(res);
	}
}

function requestRecipes(req, res, recipe, callback) {
	var parameters = '?q="chicken duck"&app_id=e830aa3b&app_key=85d44bf24c3f5eaf6248a92872b0e6d6';
	var options = {
		host : 'https://api.edamam.com', 
		path : '/search' + parameters, 
		method : 'GET'
	};
	
	http.request(options, function(response) {
		
	});
}


function replyMissingRecipe(res) {
	res.writeHead(400, {'Content-Type' : 'text/json'});
	res.end('{"message" : "no recipe given"}');
}
function replyTestSuccess(res) {
	res.writeHead(200, {'Content-Type' : 'text/json'});
	res.end('{"message" : "thank you for the request"}');
}
function replyPostNotSupported(res) {
	res.writeHead(405, {'Content-Type' : 'text/json'});
	res.end('{"message":"POST not supported"}');
}