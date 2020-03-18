const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const listEndPoints = require ('express-list-endpoints');

const port = process.env.PORT || 6543;
dotenv.config();

mongoose.connect( process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false})
    .then(db => console.log(`Mongodb is connected`), err => console.log(err));


app.listen( port, ()=>{
    console.log(`server is launched at launchpad ${port}`);
})

// console.log(listEndPoints(app));