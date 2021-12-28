
const Twit = require('twit');
// const { getFacts } = require('./facts');
require('dotenv').config()

const T = new Twit({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_KEY_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});



// use this to log errors from requests
function responseCallback(err, data, response) {
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

stream.on('tweet', function (tweet) {

  if (tweet.text.includes('@footb0t')) {
    // console.log(tweet)

    const season = tweet.match(/\b\d{4}\b/g)[0];
    const isCurrent = new Date().getFullYear() == season ? true : false;
    const seachQuery = tweet.replace(/\b\d{4}\b/g, "");
    var config = {
      method: 'get',
      url: 'https://v3.football.api-sports.io/leagues',
      headers: {
        'x-rapidapi-key': process.env.FOOT_BALL_API_KEY,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      },
      params: { season: season, search: searchQuery, current: "true" }
    };

    axios(config)
      .then(function (response) {
        T.post('statuses/update', { status: response, in_reply_to_status_id: tweet.id_str }, function (err, data, response) {
          if (data) {
            console.log(data);
          } else if (response) {
            console.log(response);
          } else {
            console.log(err)
          }
        });

      })
      .catch(function (error) {
        console.log(error);
      });
    // T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
    console.log(tweet);

  }
  // if(tweet)
  // if(!users.includes(tweet.user.id_str)) {return;}
  // T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
});

// replies after mention code block
// var replystream = T.stream('statuses/filter', { track: '@footb0t' });

// replystream.on('tweet', function (tweet) {
//   var id = tweet.id_str;
//   var text = tweet.text;
//   var username = tweet.user.screen_name;
//   var replyText = "Hello World";
//   console.log(replyText);

//   T.post('statuses/update', { status: replyText, in_reply_to_status_id: id }, responseCallback);
// })

