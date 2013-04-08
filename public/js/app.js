(function (window, document, $, undefined) {
	'use strict';

	var tweets = new tweetsMap("map");
	tweets.showMap()

	tweets.getTweets(1000).done(function(tweets){
		//console.log('all tweets loaded');
		console.log(tweets.length);
	});


})(this.window, this.document, this.jQuery);

