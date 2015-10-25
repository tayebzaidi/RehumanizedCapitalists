console.log("Deloying EatEasy server...");

//Load Dependencies
var http 	= require('http');
var fs = require('fs');
var util = require('util');

var server = http.createServer(requestHandler);
server.listen(1337);
console.log("Server Deployed.");

//Main Request Handler
function requestHandler(req, res) {
	console.log("Request recieved.");
	if(req.url == '/api') {
		handleApiRequest(req, res);
	} else {
		handleFileRequest(req, res);
	}
}

function handleFileRequest(req, res) {
	var filename = "404.html";
	fs.readFile(filename, function(err, data) {
		if(!err) {
			res.end(data);
		} else {
			console.log("Error reading file: " + err);
			res.end();
		}
	})
}

function handleApiRequest(req, res) {
	
}