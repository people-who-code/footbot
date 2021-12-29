const T = require('../config');
const { getLeague } = require('./getLeague');

const leagueReply = () => {
  var replystream = T.stream('statuses/filter', { track: '@footb0t' });

  replystream.on('tweet', function (tweet) {
    const season = tweet.match(/\b\d{4}\b/g)[0];
    const isCurrent = new Date().getFullYear() == season ? true : false;
    const seachQuery = tweet.replace(/\b\d{4}\b/g, "");
    // T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
    // console.log(tweet.id_str);
    var output = getLeague(season, seachQuery, isCurrent);
    var replyForQueryTweet = `Name:${output.response[0].league.name}\n Country:${output.response[0].country['name']}\n Seasons:${output.response[0].seasons['start']}-${output.response[0].seasons['end']}`
    T.post('statuses/update', { status: replyForQueryTweet, in_reply_to_status_id: tweet.id_str }, function (err, data, response) {
      console.log(response)
    });

  });
}

module.exports = leagueReply;