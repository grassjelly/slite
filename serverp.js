var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var curState = false;
var gpio = require("pi-gpio");
var pin;


app.use(express.static(__dirname + '/public'));
//app.use(bodyParser());


server.listen(8080);

io.sockets.on('connection', function (socket) {

  socket.on('loadState', function (loadstate) {
    console.log(curState);
    socket.emit('loadState', curState);
  });

  socket.on('triggerSwitch', function (state) {
  	curState = !curState;
    toggle(7);
		console.log(curState);
    socket.emit('triggerSwitch', curState);
  });
  
});




function toggle(pin){
	
gpio.open(pin, "output", function(err){
	gpio.write(pin,1);
	setTimeout(function(){
			gpio.write(pin, 0);
			gpio.close(pin);
		},300);
	});
}


