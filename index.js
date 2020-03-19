const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const listEndPoints = require ('express-list-endpoints');

const reviewService = require ('./src/service/reviews/index');

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

app.use(express.json());
app.use('/review', reviewService);

console.log(listEndPoints(app));