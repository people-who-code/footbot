
const Twit = require('twit');
require('dotenv').config()

const T = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_KEY_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
  });
  
  // T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  //   console.log(data)
  // })

// use this to log errors from requests
function responseCallback (err, data, response) {
  console.log(err);
 }
 
 // stream tweets from real madrid official account 
  const stream = T.stream('statuses/filter', {track: '@realmadriden'});

  stream.on('tweet', tweet => {
    T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
    });
   