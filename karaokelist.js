var express = require('express');
var WebSocketServer = require('ws').Server;
var fs = require('fs');
var debug = require('debug');
var app = express();
var nodemailer = require('nodemailer');
var sendgridTransport = require('nodemailer-sendgrid-transport');
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('index.html');
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

var transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_user: 'steveandrewarcher',
			api_key: 'nx74205d'
		},
	}));

app.post("/sendReqToHost", function(req,res){
	var name = req.body.name;
	var song = req.body.song;
	var mailOptions = {
		from: '"sender" <steveandrewarcher@gmail.com>',
		to: "archer.acting@gmail.com",
		subject: 'Song Request',
		text: name + "   " + song,
	}
	transporter.sendMail(mailOptions, (error,info) => {
		if(error){
			res.send("email failed")
			return console.log(error);
		}else{
			res.send("success")
		}
	});
	
});
