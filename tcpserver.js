var net = require('net'),
SerialPort = require("serialport").SerialPort

var serialPort;
var portName = '/dev/ttyACM0'; //change this to your Arduino port

function startServer(debug)
{
	// on request event
	function onRequest(socket) {
	  console.log("Socket Opened!");
	  socket.on('data', function(data){
	  	serialPort.write(data);
	  });
	  socket.on('end', function(){console.log("Socket Closed")});
	}
	
	var netServer = net.createServer(onRequest).listen(3333, function(){
		console.log("Listening at: localhost 3333");
		console.log("TCP Server is up");
	}); 
	serialListener(debug);
}

// Listen to serial port
function serialListener(debug)
{
    var receivedData = "";
    serialPort = new SerialPort(portName, {
        baudrate: 9600,
        // defaults for Arduino serial communication
         dataBits: 8,
         parity: 'none',
         stopBits: 1,
         flowControl: false
    });
 
    serialPort.on("open", function () {
      console.log('open serial communication for TCP');
            // Listens to incoming data
       // serialPort.on('data', function(data) {
          //   receivedData += data.toString();
         // if (receivedData .indexOf('E') >= 0 && receivedData .indexOf('B') >= 0) {
          // sendData = receivedData .substring(receivedData .indexOf('B') + 1, receivedData .indexOf('E'));
          // receivedData = '';
        // }
         // send the incoming data to browser with websockets.
       //socketServer.emit('update', sendData);
      //});  
    });  
}

exports.start = startServer;
