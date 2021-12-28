const T = require('../config');

const leagueReply = () =>
{
    var replystream = T.stream('statuses/filter', { track: '@footb0t league' });

replystream.on('tweet', function (tweet) {

      // T.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
      console.log(tweet.id_str);
       T.post('statuses/update', { status: "wah goan mi gee? mi cyaan provide such info right now but soon!! Trust mi chargie", in_reply_to_status_id:tweet.id_str }, function (err, data, response) {
        console.log(response)
      });

});
}

module.exports = leagueReply;