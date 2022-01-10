var request = require('request');
require('dotenv').config()
const T = require('../config')

 const getPlayerStats = ()=>{
    var player_id = 13;//Math.floor((Math.random() * 500) + 1);
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
       var count= Object.keys(data.response).length;
       console.log(data)
      if(count!=0){

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
  }
  else{
    console.log("user not found")
  }
      
      
      
     });
   }

   module.exports = getPlayerStats;
