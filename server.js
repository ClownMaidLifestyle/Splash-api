//use stuff
const express = require("express");
const cors = require("cors");
const axios = require("axios");

//load env file
require("dotenv").config();

//app used to create an instance of the server
const app = express();

//port innit
const PORT = process.env.PORT || 8090;

//middleman between client and server
app.use(cors());

//set up the endpoint and a response from the home root
app.get("/", (request, response)=>{
    response.status(200).json("This thingy is working???");
});

app.listen(PORT, ()=> console.log(`APP is listening on port ${PORT}`));

const API = `https://api.unsplash.com/search/photos/?client_id=${process.env.ACCESS_KEY}&query=wizard`;

app.get("/photos", async (request, response)=>{
    await axios.get(API);
    const res = await axios.get(API);
    console.log(res.data.results[0].urls.regular);

    const photos = res.data.results.map((photo)=>{
        return {
            id: photo.id,
            img_url: photo.urls.regular,
            original_image: photo.links.self,
            photographer: photo.user.name
        }
       
    })
    response.status(200).json(photos);
});