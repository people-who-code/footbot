var request = require("request");
const Twit = require('twit');
  
require('dotenv').config()

const T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
  


// use this to log errors from requests
function responseCallback (err, data, response) {
  console.log(err);
 }
 var users = [
  '26809005', // @goal
  '18091004', // @ESPNFC
  '2371041', // @football
  '443668407', // @SkyFootball
  '140070953', // @FIFAcom
  '627673190', // @ChampionsLeague
  '11096152', // @101greatgoals
  '44606764', // @OptaJoe
  ' 87036741', // @Zonal_marking
  '176754253', // @BeardedGenius
  '11096152' // @101greatgoals

  
  
  ];
  //'1059736783376842753' //@me
  
 var stream = T.stream('statuses/filter', { follow: users });
 var replystream = T.stream('statuses/filter',{track:'@footb0t'});  
 
//retweets tweets users from users array
  stream.on('tweet', function (tweet) {
      if(!users.includes(tweet.user.id_str)) {return;}
      T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
      console.log(tweet);
      });
 
//replys when mentioned 
  replystream.on('tweet',function(tweet){
        var id = tweet.id_str;
        var text = tweet.text;
        var username = tweet.user.screen_name;
        var replyText = "Hello World";
     
      
         T.post('statuses/update',{in_reply_to_status_id: id, status:replyText},responseCallback);
      })
   
// posts random players statistics 
  const getPlayerStats = ()=>{
 var player_id = Math.floor((Math.random() * 1000) + 1);
 var dt = new Date();
 var season = dt.getFullYear(); 
 
  var options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/players',
    qs: {id: player_id,season:'2021'}, // gonna fetch specfically for 2021 for the meantime 
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': process.env.FOOTBALL_API_KEY
    }
  };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    var data = JSON.parse(body);

  var fname = data.response[0].player.firstname;
  var lname = data.response[0].player.lastname;
  var appearances = data.response[0].statistics[0].games.appearences;
  var goals = data.response[0].statistics[0].goals.total;
  var assists = data.response[0].statistics[0].goals.assists;
  var team = data.response[0].statistics[0].team.name;
  assists == null ? assists = 0 : assists;

   
        msg = fname+" "+lname +" of "+team+" scored a total of "+ goals +" goals with "+ assists+ " assists with "+appearances+" appearances this season";
        T.post('statuses/update', { status: msg }, function(err, data, response) {
          console.log(data)
         })
   
   
   
  });
}

setInterval(getPlayerStats,3000); // runs every 3secs for testing!
