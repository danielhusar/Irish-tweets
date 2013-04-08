
/*
 * Routes
 */
var sTwitter = require('simple-twitter');
var config = require(process.cwd() + '/config/twitter.js')();

/**
 * main index page
 * @param  {object} req request object
 * @param  {object} res response object
 * @return {void}
 */
exports.index = function(req, res){
	res.render('index', { title: 'Tweet Map' });
};

/**
 * Json tweets feed
 * @param  {object} req request object
 * @param  {objest} res response object
 * @return {void}
 */
exports.tweets = function(req, res){

		var count = req.params.count || 100;
		var max_id = req.params.max_id || false;
		var param = '?geocode=53.187933,-7.998047,250km&count='+ count + ((max_id && max_id !== 'null') ? '&max_id=' + max_id : '');

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