var express = require('express');
var WebSocketServer = require('ws').Server;
var fs = require('fs');
var debug = require('debug');
var app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
	res.render('index');
});

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
var wss = new WebSocketServer({server:server});

wss.on('connection', function(ws){
	var fd = fs.openSync('list/lastlist.lst', 'r');
	var data = fs.readFileSync('list/lastlist.lst', 'utf8');
	ws.send(data);
	fs.closeSync(fd);
	fs.watch('list/lastlist.lst', function(event, fileName){
		if(event=='change'){
			var fd = fs.openSync('list/lastlist.lst', 'r');
			var data = fs.readFileSync('list/lastlist.lst', 'utf8');
			ws.send(data);
			fs.closeSync(fd);
		}
	});
	
	
});
