const T = require('../config');

const retweetNews =()=> {
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
    '11096152', // @101greatgoals
    
  
  
  ];


  //'1059736783376842753' //@me

  function responseCallback(err, data, response) {
    console.log(err);
  }

var stream = T.stream('statuses/filter', { follow: users });

stream.on('tweet', function (tweet) {
    if(!users.includes(tweet.user.id_str)) {return;}
  T.post('statuses/retweet/:id', {id: tweet.id_str}, responseCallback);
});
}

module.exports = retweetNews;