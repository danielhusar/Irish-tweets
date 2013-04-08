(function (window, document, $, google, undefined) {
	'use strict';

  var tweetsMap = window.tweetsMap = function( container ){
	  this.map = {};
	  this.geocoder = {};
	  this.infowindow = new google.maps.InfoWindow(); //only one infowindow at time
	  this.container = container;
	}

	/**
	 * Show the main google map
	 * @return this
	 * @chainable
	 */
	tweetsMap.prototype.showMap = function(){
	  var that = this;
	  var myOptions = {
	      zoom: 7,
	      center: new google.maps.LatLng(53.187933,-7.998047),
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
	      zoomControl: true,
	      panControl: true,
	      streetViewControl: false,
	      mapTypeControl: false,
	    }
	  this.map = new google.maps.Map(document.getElementById(this.container), myOptions);
	  return this;
	};

	/**
	 * Add tweet to the map
	 * @param {object} tweet object from the tweeter
	 */
	tweetsMap.prototype.addTweet = function(tweet){

		if(tweet.geo){ //show only tweets that have some geo information
			var that = this;
			var marker = new google.maps.Marker({
	      map: that.map,
	      draggable: false,
	      animation: google.maps.Animation.DROP,
	      position: that.getPosition(tweet.geo.coordinates[0], tweet.geo.coordinates[1]),
	      title : tweet.place.full_name,
	      icon : '/img/twitter.png',
	    });

	    var urlMatch = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
	    var userMatch = /(^|\s)@(\S+)/g;
	    var hashMatch = /(^|\s)#(\S+)/g;
    	var msg = tweet.text.replace(urlMatch,'<a href="$1" target="_blank">$1</a>')
    											.replace(userMatch,'$1<a href="http://www.twitter.com/$2" target="_blank">@$2</a>')
    											.replace(hashMatch, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');

	    var contentString = '\
		    <div class="tweet">\
		    	<a href="http://www.twitter.com/'+tweet.user.screen_name+'" target="_blank">\
		    		<img src="'+tweet.user.profile_image_url+'" alt="">\
		    	</a>\
		    	<section>\
		    	  <a href="http://www.twitter.com/'+tweet.user.screen_name+'" class="name" target="_blank">@'+tweet.user.screen_name+'</a>\
		    	  <div class="message">'+ msg +'</div>\
		    	</section>\
		    </div>';

	    google.maps.event.addListener(marker, 'click', function() {
	    	that.infowindow.setContent(contentString);
	      that.infowindow.open(that.map, marker);
	    });
	    return marker;
   	} else {
   		return false;
   	}
	};

	/**
	 * Show all the tweets in the map
	 * @param  {number} count of the tweets to show
	 * @return {object} deferred function
	 */
	tweetsMap.prototype.getTweets = function(count, max_id){
		
		max_id = max_id ? max_id : false;

		var that = this;
		var tweets = [];
		var deferred = $.Deferred();
		var pagin = (count && count < 100) ? count : 100;

		(function getTweets(pagin, max_id){
			$.ajax({
				url      : '/json/tweets/'+ pagin +'/' + max_id,
	      dataType : 'json',
	      cache    : false
			}).done(function(data){

				var statuses = data.statuses;
				var offset = count - (tweets.length + statuses.length);
				pagin = (offset > pagin) ? pagin : offset;

				tweets.push.apply(tweets, statuses);
				that.showTweets(statuses);

				if(tweets.length < count){
					getTweets(pagin, data.statuses[data.statuses.length - 1].id - 1);
				} else {
					deferred.resolve(tweets);
				}



			}).fail(function(err){
				deferred.resolve(err);
			});
		})(pagin, max_id);

		return deferred.promise();

	}


	/**
	 * Get the tweets from the json feed
	 * @param  {number} count  how many tweets to retrieve
	 * @param  {number} max_id max id of the first tweet
	 * @return {object} ajax promise call
	 */
	tweetsMap.prototype.showTweets = function(tweets){
		var length = tweets.length;
		var that = this;

		while (length--) {
			var tweet = tweets[length];
			that.addTweet(tweet);
		}
	}

	/**
	 * Get the position of the latitude and longtitude
	 * @param  {number} lat latitude
	 * @param  {number} lng longtitude
	 * @return {object} google object with the position
	 */
	tweetsMap.prototype.getPosition = function(lat, lng){
		return new google.maps.LatLng(lat, lng);
	};


	/**
	 * Center the map for searched term
	 * @param  {string} address
	 * @return {void}
	 */
	tweetsMap.prototype.search = function(address){
	  var that = this;
	  var geocoder = new google.maps.Geocoder();
	  geocoder.geocode( { 'address': address}, function(results, status) {
	    if (status == google.maps.GeocoderStatus.OK) {
	      that.map.fitBounds(results[0].geometry.viewport);
	    }
	  });
	}



})(this.window, this.document, this.jQuery, this.google);