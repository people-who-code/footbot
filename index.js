const T = require('./config.js');
// const { getFacts } = require('./facts');
 const getPlayerStats = require('./components/getPlayerStats');
 const retweetNews = require('./components/retweetNews');
 const leagueReply = require('./components/leagueReply');

const express = require('express');
const app = express();
app.get('/',(req,res)=>res.send(<b>Home page for footb0t</b>))

//leagueReply(); // reply to '@footb0t league' mention

setInterval(getPlayerStats,1200000); // posts player statistics every 20mins

retweetNews(); // retweets football news from users list

setInterval(() => {
    axios.get('http://footb0t.herokuapp.com')
}, 6000 * 70)
