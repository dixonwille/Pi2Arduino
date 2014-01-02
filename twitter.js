function startTwitter(twitter,serialPort,socket) {

			twitter.setAuth (
    				'4wZdTA2lTCVu4aKE3tJCsw',
    				'Xp2klAp02qyJLOPsMwnHsVx1oBTkAZDOfdxuzquaI',
    				'30471238-iIpNSeZSKpNop3mhXWBUs201gYIFEsB0McKmpeS2V',
    				'wLkq4U2uIek8GXYdZBV31JRBqrO9NEOHFtmRCtLgTGx60'
  			);
			try {
				socket.write('Now updating using twitter\n');
			}catch(err){
				console.log('Now updating using twitter');
			}
			twitter.stream('statuses/filter', {
      				track: '#red,#green,#blue,#exit,#update'
    			}, function(json) {
				var tweet = JSON.parse( json );
      				if (tweet.text && tweet.user) {
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
						}else if(tweet.text.indexOf('#exit') > -1 && tweet.user.screen_name == 'dixonwille'){
          						twitter.abort();
							try{
								socket.write('Back to normal\n');
							}catch(err){
								console.log('Back to normal');
							}
						}else if(tweet.text.indexOf('#update') > -1){
          						var last = tweet.text.indexOf('#update');
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
    			});
}
exports.startTwitter = startTwitter;
