/**
 * Main app
 */

var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(app.router);
  app.use(require('less-middleware')({ 
    src: __dirname + '/public',
    force : true
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/json/tweets/:count/:max_id', routes.tweets);


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
})