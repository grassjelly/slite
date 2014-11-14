var gpio = require("pi-gpio");
var pin;

function toggle(pin){
	
gpio.open(pin, "output", function(err){
	gpio.write(pin,1);
	setTimeout(function(){
			gpio.write(pin, 0);
			gpio.close(pin);
		},100);
	});
}




toggle(7)
