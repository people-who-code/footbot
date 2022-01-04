var axios = require('axios');
require('dotenv').config()

const getLeague = async(season, searchQuery, isCurrent) => {
    var result = "";
    var config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/leagues',
        headers: {
            'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        },
        params: {search: searchQuery,current:true}
    };

    await axios(config)
        .then(function (response) {
         
         result = response.data;
        })
        .catch(function (error) {
            console.log(error);
        });

        return result;
    
}

module.exports = getLeague;