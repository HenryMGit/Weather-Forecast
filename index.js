const express = require('express')
const app = express();
const fetch = require('node-fetch');
require('dotenv').config();


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listenting on port ${port}`));
app.use(express.static('public'))
app.use(express.json({ limit: '1mb' }));

app.get('/weather/:lat/:long',  (request, response) =>{
    const api_key=process.env.API_KEY;   
    const api = `https://api.darksky.net/forecast/${api_key}/${request.params.lat},${request.params.long}`;

    fetch(api)
    .then( fetch_response =>{
        return fetch_response.json();
    })
    .then( jsonData =>{
        response.json(jsonData);
    }); 
});

