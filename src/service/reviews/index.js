const express = require ('express');
const router = express.Router();
const passport = require('passport');

//Mongoose Schema for Reviews
const {reviewCollection} = require ('../../model/review/index');

//Mongoose Schema for users


//To get ALL reviews
router.get('/', async(req,res)=>{
    try{
        const reviews = await reviewCollection.find({});
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
        const reviews = await reviewCollection.find({userId: req.params.userId});
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
        const reviews = await reviewCollection.find({placeId: req.params.placeId});
        res.status(200).json(reviews);
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
});

//To POST a review to a place note: private, a user needs to be authorise to post a review
router.post('/:placeId',
//  passport.authenticate('jwt'),
  async(req,res)=>{
    try{
        console.log('Sending Review');
        const incomingData = {...req.body, 
            // userId: req.user._id,
            placeId: req.params.placeId};
        const review = await reviewCollection.create(incomingData);
        res.status(200).json(review);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Edit a review note: a user has to be authorised to edit a review
router.put('/:reviewId', passport.authenticate('jwt'), async(req,res)=>{
    try{
        const userId = req.user._id.toString();
        const reviewData = await reviewCollection.findById(req.params.reviewId);
        const incomingData = req.body;
        if (reviewData.userId === userId){
            console.log('updating review');
            //Ignore these codes
            // for(props in incomingData){
            //     reviewData[props] = incomingData[props]
            // }
            const update = await reviewCollection.findByIdAndUpdate(req.params.reviewId, incomingData, {new:true});
            if (update){
                res.status(200).json(update);
            } else {
                res.status(400).json('review not found');
            }
        }else{
            res.status(400).json('Not authorised');
        }
    }catch (err){
        console.log(err);
        res.status(500).json(err);
    }
})

//Test Patch
// router.patch('/test/:reviewId', async(req,res)=>{
//     try{
//         // const userId = req.user._id.toString();
//         // const reviewData = await reviewCollection.findById(req.params.reviewId);
//         const incomingData = req.body;
//         // if (reviewData.userId === userId){
//         //     console.log('updating review');
//             // for(props in incomingData){
//             //     reviewData[props] = incomingData[props]
//             // }
//             const update = await reviewCollection.findByIdAndUpdate(req.params.reviewId, incomingData, {new:true});
//             if (update){
//                 res.status(200).json(update);
//             } else {
//                 res.status(400).json('review not found');
//             }
//         // }else{
//         //     res.status(400).json('Not authorised');
//         // }
//     }catch (err){
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

//Delete a review note: a user must be authorised to delete a review
router.delete('/:reviewId',passport.authenticate('jwt'), async(req,res)=>{
    try{
        console.log('Removing a review from a place');
        const userId = req.user._id.toString();
        const review = await reviewCollection.findById(req.params.reviewId);
        if (review.userId === userId){
        const removed = await reviewCollection.findByIdAndRemove(req.params.reviewId);
        if (removed){
            res.status(200).json('Removed');
        } else {
            res.status(400).json('Review not found');
        }
    } else{
        res.status(400).json('not authorised');
    }
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})
module.exports = router;
