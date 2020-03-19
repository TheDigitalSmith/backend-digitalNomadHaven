const express = require ('express');
const router = express.Router();

//Mongoose Schema for Reviews
const reviewDb = require ('../../model/review/index');

//Mongoose Schema for users


//To get ALL reviews
router.get('/', async(req,res)=>{
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

//To get ALL reviews by a user
router.get('/:userId', async(req,res)=>{
    try{
        console.log('fetching all reviews from a user');
        const reviews = await reviewDb.find({userId: req.params.userId});
        if (reviews){
            res.status(200).json(reviews);
        } else {
            res.status(400).json('No user found');
        }
    } catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

//To get ALL reviews of a place
router.get('/:placeId', async (req,res)=>{
    try{
        console.log('Fetching reviews from user');
        const reviews = await reviewDb.find({placeId: req.params.placeId});
        res.status(200).json(reviews);
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

//To POST a review to a place note: private, a user needs to be authorise to post a review
router.post('/:placeId', async(req,res)=>{
    try{
        console.log('Sending Review');
        const review = await reviewDb.create(req.body);
        res.status(200).json(review);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Edit a review note: a user has to be authorised to edit a review
router.put('/:reviewId', async(req,res)=>{
    try{
        console.log('updating review');
        const update = await reviewDb.findByIdAndUpdate(req.params.reviewId, {$set:{...req.body}}, {new:true});
        if (update){
            res.status(200).json(update);
        } else {
            res.status(400).json('review not found');
        }
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Delete a review note: a user must be authorised to delete a review
router.delete('/:reviewId', async(req,res)=>{
    try{
        console.log('Removing a review from a place');
        const removed = await reviewDb.findByIdAndRemove(req.params.reviewId);
        if (removed){
            res.status(200).json('Removed');
        } else {
            res.status(400).json('Review not found');
        }
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;
