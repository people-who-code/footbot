var axios = require('axios');
var dotenv = require('dotenv');
dotenv.config();
module.exports.getLeague = (season, searchQuery, isCurrent) => {
    var result = "";
    var config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/leagues',
        headers: {
            'x-rapidapi-key': process.env.FOOT_BALL_API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        },
        params: { season: season, search: searchQuery, current: isCurrent }
    };

    axios(config)
        .then(function (response) {
            result = JSON.stringify(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    return result
}