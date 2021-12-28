var axios = require('axios');
var dotenv = require('dotenv');
dotenv.config();
    var config = {
        method: 'get',
        url: 'https://v3.football.api-sports.io/leagues',
        headers: {
            'x-rapidapi-key': process.env.FOOT_BALL_API_KEY,
            'x-rapidapi-host': 'v3.football.api-sports.io'
        },
        params: { season:2021, name:"Druga HNL",current:"true" }
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });