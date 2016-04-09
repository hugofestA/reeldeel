//This code is made by hugofestA in the project REELDEEL.
//The code is under ISC license.
var http = require('http');

var useragent = 'DiscordBot (https://github.com/hugofestA/reeldeel, 1.0)';

function getGateway(){
  http.get({
    host: 'discordapp.com',
    path: '/api/gateway',
    headers: {
      'User-Agent': useragent
    }
  }, function(res) {
    if (res.statusCode === 200) {
      var body = [];
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        body.push(chunk);
      });
      res.on('end', function() {
        body = body.join('');
        return body.url;
      });
    } else {
      if (res.statusCode === 429){
        setTimeout(function() {
          getGateway();
        }, parseInt(JSON.parse(res.headers).Retry-After, 10) * 1000)
        console.log('Delay: ' + );
      } else {
        console.log('Received non-ok response: ' + res.statusCode);
      }
    }
  });
}
