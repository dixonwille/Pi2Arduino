var net = require('net'),
SerialPort = require("serialport").SerialPort,
twitter = require('twitter-api').createClient();
fs = require('fs')
var serialPort;
var portName = '/dev/ttyACM0'; //change this to your Arduino port

function startServer(debug)
{
	// on request event
	function onRequest(socket) {
	  console.log("Socket Opened!");
	  socket.setEncoding('utf8');
	  socket.on('data', function(data){
		if(data.toString('utf8').trim() == 'help'){
			socket.write(fs.readFileSync(__dirname+"/pages/helpTcp.txt"));
		}else if(data.toString('utf8').trim() == 'exit'){
			socket.end('Thank you\n');
		}else if(data.toString('utf8').trim() == 'twitter'){
			twitter.setAuth (
    				'4wZdTA2lTCVu4aKE3tJCsw',
    				'Xp2klAp02qyJLOPsMwnHsVx1oBTkAZDOfdxuzquaI',
    				'30471238-iIpNSeZSKpNop3mhXWBUs201gYIFEsB0McKmpeS2V',
    				'wLkq4U2uIek8GXYdZBV31JRBqrO9NEOHFtmRCtLgTGx60'
  			);
			socket.write('Now updating using twitter');
			twitter.stream('statuses/filter', {
      				track: '#red,#green,#blue,#exit,#update'
    			}, function(json) {
				var tweet = JSON.parse( json );
      				if (tweet.text && tweet.user) {
        				if (tweet.user.screen_name === 'dixonwille') {
						if (tweet.text.indexOf('#red') > -1){
          						serialPort.write('R');
          						setTimeout(function() {
            							serialPort.write('O');
          						}, 5000);
						}else if(tweet.text.indexOf('#green') > -1){
          						serialPort.write('G');
          						setTimeout(function() {
            							serialPort.write('O');
          						}, 5000);
						}else if(tweet.text.indexOf('#blue') > -1){
          						serialPort.write('B');
          						setTimeout(function() {
            							serialPort.write('O');
          						}, 5000);
						}else if(tweet.text.indexOf('#exit') > -1){
          						twitter.abort();
						}else if(tweet.text.indexOf('#update') > -1){
          						var last = tweet.text.indexOf('#update') - 1;
							var txt = tweet.text.slice(0,last);
							var vals = txt.split(',');
							var redVal = vals[0];
							var greenVal = vals[1];
							var blueVal = vals[2];
							serialPort.write(redVal+','+greenVal+','+blueVal+'U');
          						setTimeout(function() {
            							serialPort.write('O');
          						}, 5000);
						}
					}
      			}
    			});
		}else{
	  		serialPort.write(data);
		}
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
