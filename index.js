const app = require('express')();
const http = require('http').Server(app);
const redis = require('redis');
const client = redis.createClient();
const io = require('socket.io')(http);
const appName = process.argv.slice(2)[0];
const serverPort = process.argv.slice(3)[0];
const socketPort = process.argv.slice(4)[0];

client.subscribe(appName);

client.on("message", function (channel, message) {
	console.log(message)
	var info = JSON.parse(message);
	io.sockets.emit(channel, info);
	console.log(`${channel} -- ${info.payload}`);
});

io.listen(socketPort);

io.on("connection", function(socket) {
	console.log("connected socket")
	socket.on("disconnect", function () {
		console.log("client disconnected")
		socket.disconnect();
	});
});

http.listen(serverPort, function () {
	console.log('listening on port ' + serverPort);
});