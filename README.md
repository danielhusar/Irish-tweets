Irish Tweets
============

run npm install to install all dependencies<br>
rename twitter.sample.js to twittter.js and put there your api informations<br>
node app to start server

Known Issues
============
- Currently it display only tweets with geo informations, so tweets without geo are not displayed on the map. (Optionally we can dig the location from user profile, becase twitter is fallbacking to that info, if the geo is not present. But I have found it very unreaible.)
- Cross browser compatibility of the info window. (maybe move to table..)
- Somee tweeets can be duplicated. (Solution: ignore first tweet if the max_id parameter is present)

Demo
============
[http://irish-tweets.eu01.aws.af.cm/](http://irish-tweets.eu01.aws.af.cm/)



Demo
============
[http://irish-tweets.eu01.aws.af.cm/](http://irish-tweets.eu01.aws.af.cm/)


ScreenShot
============
![screenshot](https://raw.github.com/danielhusar/Irish-tweets/master/public/img/screen.png)
