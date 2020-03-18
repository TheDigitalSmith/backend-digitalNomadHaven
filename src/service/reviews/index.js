const express = require ('express');
const router = express.Router();

//Mongoose Schema for Reviews
const reviewDb = require ('../../model/review/index');

//Mongoose Schema for users


//To get all reviews
router.get('/reviews', async(req,res)=>{
    try{
        const reviews = await reviewDb.find({});
        if (reviews){
            res.status(200).json(reviews);
        }else{
            res.status(400).json('No reviews found');
        }
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//To get reviews of a place
router.get('/reviews/:placeId', async (req,res)=>{
    try{
        console.log('Fetching reviews from user');
        const reviews = await reviewDb.find({placeId: req.params.placeId});
        res.status(200).json(reviews);
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

//To add a review to a place
router.post('/:placeId/reviews', async(req,res)=>{
    try{
        console.log('Sending Review');
        const review = await reviewDb.create(req.body);
        res.status(200).json(review);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;
