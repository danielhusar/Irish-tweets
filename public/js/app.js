/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, indent:4, maxerr:50, multistr: true */
(function (window, document, $, TweetsMap, undefined) {
	'use strict';

	var Tweets = new TweetsMap("map");
	Tweets.showMap().getTweets(1000).done(function(tweets){
		//console.log('all tweets loaded:', tweets.length);
	});

	//search functionality
	$('#search').submit(function() {
		Tweets.search($(this).find('.input').val());
		return false;
	});

})(this.window, this.document, this.jQuery, this.TweetsMap);

