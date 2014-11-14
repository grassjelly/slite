var express = require('express');
var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);
var gpio = require("pi-gpio");
var curState1 = false;
var curState2= false;
var curState3 = false;
var curState4 = false;

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser());


server.listen(8080);

io.sockets.on('connection', function (socket) {

  socket.on('loadState1', function (loadstate1) {
    console.log(curState1);
    socket.emit('loadState1', curState1);
  });

  socket.on('loadState2', function (loadstate2) {
    console.log(curState2);
    socket.emit('loadState2', curState2);
  });

socket.on('loadState3', function (loadstate3) {
  console.log(curState3);
  socket.emit('loadState3', curState3);
});

socket.on('loadState4', function (loadstate4) {
  console.log(curState4);
  socket.emit('loadState4', curState4);
});

  socket.on('triggerSwitch', function (state) {
    console.log(state);
    if(state ===1){
      if(curState1){
        toggle(7);
      }
      else{
        toggle(7);
      }
    	curState1 = !curState1;
      console.log(curState1);
    }

    if(state === 2){
      if(curState2){
        toggle(12);
      }
      else{
        toggle(11);
      }
      curState2 = !curState2;
      console.log(curState2);
    }

    if(state ===3){
      if(curState3){
        toggle(16);
      }
      else{
        toggle(15);
      }
      curState3 = !curState3;
      console.log(curState3);
    }

    if(state ===4){
      if(curState4){
        toggle(22);
      }
      else{
        toggle(18);
      }
      curState4 = !curState4;
      console.log(curState4);
    }

  });


});

function toggle(pin){
  gpio.open(pin, "output", function(err){
    gpio.write(pin,1);
    setTimeout(function(){
      gpio.write(pin,0);
      gpio.close(pin);
    }, 300);
  });
}
