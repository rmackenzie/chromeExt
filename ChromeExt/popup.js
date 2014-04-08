//popup.js
//javascript for the Twitch Streamer plugin for chrome

var apiurl = 'https://api.twitch.tv/kraken/games/top';
var twitch = json_decode(file_get_contents(apiurl), true);
document.write("?");
for (var i = 0; i < twitch.length; i++)
{
	document.write("hi");
}
