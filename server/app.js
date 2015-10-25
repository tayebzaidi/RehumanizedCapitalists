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
		requestRecipes(query.recipe, function(recipes) {
			console.log(recipes);
			var recipeList = [];
			var calorieCount = [];
			for(var i = 0; i < recipes.hits.length; i += 1) {
				var individualRecipe = recipes.hits[i];
				var recipeInfo = individualRecipe.recipe.label;
				calorieCount.push(individualRecipe.calorie)
				recipeList.push(recipeInfo);
				
			};
			console.log(recipeList);
			res.end(JSON.stringify(recipes));
		});
	} else {
		replyPostNotSupported(res);
	}
}

function requestRecipes(recipe, callback) {
	console.log(recipe);
	console.log(typeof(recipe));
	
	var parameters = util.format("?q=%s", recipe);
	var encParameters = encodeURI(parameters);
	console.log(encParameters);
	var options = {
		host : 'api.edamam.com', 
		path : '/search' + encParameters, 
		method : 'GET'
	};
	
	var req = http.request(options, function(res) {
		console.log("STATUS: " + res.statusCode);
		console.log("HEADERS: " + JSON.stringify(res.headers));
		var recipes = "";
		res.on("data", function(chunk) {
			recipes += chunk;
		});
		res.on("end", function(chunk) {
			console.log("Request complete.");
			var obj = JSON.parse(recipes);
			console.log(obj);
			callback(obj);
		});
	});
	
	req.on("error", function(chunk) {
		return null;
	});
	
	console.log("Ending request for data...");
	req.end();
}


function replyInternalServerError(res){
	res.writeHead(500,  {'Content-Type' : 'text/json'});
	res.end('{"message" : "internal server error"}');
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