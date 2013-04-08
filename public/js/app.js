(function (window, document, $, undefined) {
	'use strict';

	var tweets = new tweetsMap("map");
	tweets.showMap().getTweets(1000).done(function(tweets){
		//console.log('all tweets loaded');
	});

	//search functionality
	$('#search').submit(function() {
  	tweets.search($(this).find('.input').val());
  	return false;
	});


})(this.window, this.document, this.jQuery);

