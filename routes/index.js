
/*
 * GET home page.
 */
var sTwitter = require('simple-twitter');
var config = require(process.cwd() + '/config/twitter.js')();

exports.index = function(req, res){
  res.render('index', { title: 'Tweet Map' });
};

exports.tweets = function(req, res){

		var count = req.params.count || 100;
		var max_id = req.params.max_id || false;
		var param = '?geocode=53.187933,-7.998047,250km&count='+ count + (max_id ? '&max_id=' + max_id : '');

		twitter = new sTwitter(config.consumer_key, 
		               				config.consumer_secret, 
		               				config.access_token,
		               				config.access_token_secret,
		               				false
		               			 );

		twitter.on('get:search/tweets', function(error, data){
      res.writeHead(200, {'Content-Type': 'application/json'});
			res.write(data || '');
			res.end();
    }).get("search/tweets", param);

};