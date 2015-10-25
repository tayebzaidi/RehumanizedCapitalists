var http = require('http');

var parameters = '?q="dog"&banana=254';
var options = {
	host : '141.140.178.93',
	port : '1337',
	path : '/api/' + parameters, 
	method : 'GET'
};

console.log("Making request...");
var req = http.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
});
console.log(req);
console.log("Made request.");
req.end();
