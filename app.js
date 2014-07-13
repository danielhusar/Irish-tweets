/**
 * Main app
 */

var express = require('express'),
		routes = require('./routes'),
		http = require('http'),
		path = require('path'),
		app = express();

//configurations
app.configure(function(){
	app.set('port', 3002);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.logger('dev'));
	app.use(app.router);
	app.use(require('less-middleware')(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

//routes
app.get('/', routes.index);
app.get('/json/tweets/:count/:max_id', routes.tweets);

//create server
http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
