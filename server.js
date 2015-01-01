var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Store connected users in a variable.
var activeVisitors = 0;

app.set('port', (process.env.PORT || 5000))
app.use(require('express').static('public'));


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

http.listen(app.get('port'), function() {
  console.log("Node app is running at port:" + app.get('port'))
})