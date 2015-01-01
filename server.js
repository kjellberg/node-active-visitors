var PORT = process.ENV.PORT || 8080;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Store connected users in a variable.
var activeVisitors = 0;

app.use(require('express').static('public'));

app.get('/', function(req, res) {
	res.sendFile( __dirname + '/public/index.html');
});

io.on('connection', function(socket){

	activeVisitors++;
	io.emit('activeVisitors', activeVisitors);
	console.log('active visitors:', activeVisitors);

	socket.on('disconnect', function(){
		activeVisitors--;
		io.emit('activeVisitors', activeVisitors);
		console.log('active visitors:', activeVisitors);
	});

});

http.listen(PORT);