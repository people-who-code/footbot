const T = require('../config');
const getLeague = require('./getLeague');

const leagueReply = async() => {
  var replystream = T.stream('statuses/filter', { track: '@footb0t' });
  var output = await getLeague('UEFA 2021');
  //console.log(output.response[0].league.name);
  for(var x =0;x<800;x++)
  {
    var j = output.response[x].league.name.includes('World Cup');
    if(j)
    {
      console.log(output.response[x].league.name)
    }
  }
  replystream.on('tweet', function (tweet) {
    const season = tweet.text.match(/\b\d{4}\b/g)[0];
    const isCurrent = new Date().getFullYear() == season ? true : false;
    const searchQuery = tweet.text.replace(/\b\d{4}\b/g, "");
    //var output = getLeague(season, searchQuery, isCurrent);
   

//     T.post('statuses/retweet/:id', { id: tweet.id_str }, (err, data, response) => {
//     console.log(err);
//   }
// );
    //console.log(tweet.id_str);
    
    //var replyForQueryTweet = `Name:${output.response[0].league.name}\n Country:${output.response[0].country['name']}\n Seasons:${output.response[0].seasons['start']}-${output.response[0].seasons['end']}`
//     T.post('statuses/update', { status: replyForQueryTweet, in_reply_to_status_id: tweet.id_str }, function (err, data, response) {
//      console.log(response)
//    });


  });
}

module.exports = leagueReply;