Irish Tweets
============

run npm install to install all dependencies<br>
rename twitter.sample.js to twittter.js and put there your api informations<br>
node app to start server

Known Issues
============
- Currently it display only tweets with geo informations, so tweets without geo are not displayed on the map. (Optionally we can dig the location from user profile, becase twitter is fallbacking to that info, if the geo is not present. But I have found it very unreaible.)
- Cross browser compatibility of the info window. (maybe move to table..)
- Tweets Ids are too big that js is rounding them, so its no possible to decrement it so in that case some tweeets can be duplicated. (Solution: ignore first tweet if the max_id parameter is present)

ScreenShot
============
![screenshot](https://raw.github.com/danielhusar/Irish-tweets/master/public/img/screen.png)
