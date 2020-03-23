const express = require ('express');
const router = express.Router();
const passport = require('passport');

const {placeCollection} = require('../../model/review/index');

router.post('/',passport.authenticate('jwt'), async(res,req)=>{
try {
    console.log('posting a place');
    const newPlace = await placeCollection.create({...req.body, posterId: req.user._id});
    res.status(200).json(newPlace);
} catch (err) {
    console.log(err);
    res.statusCode(500).json(err);
}
})

router.get('/:placeId', async(req,res)=>{
try{
    const place = await placeCollection.findById(req.params.placeId);
    if(place){
        res.status(200).json(place);
    }else{
        res.status(400).json('place not found');
    }
}catch(err) {
    console.log(err)
    res.status(500).json(err);
}
})

router.put('/:placeId',passport.authenticate('jwt'), async(req,res)=>{
try{
    const placeData = await placeCollection.findById(req.params.placeId);
    const userId = req.user._id.toString();
    const incomingData = req.body;
    if(placeData.posterId === req.user._id){
        for(props in incomingData){
            placeData[props] = incomingData[props]
        }
    const updatedPlace = await placeCollection.findByIdAndUpdate(req.params.placeId, placeData, {new:true});
    res.status(200).json(updatedPlace);
    }else{
        res.status(400).json('not authorised');
    }
}catch(err){
    console.log(err);
    res.status(500).json(err);
}
})

router.delete('/:placeId',passport.authenticate('jwt'),async(req,res)=>{
try{
    const userId = req.user._id.toString();
    const placeData = await placeCollection.findById(req.params.placeId);
    if (placeData.posterId === userId){
        const removed = await placeCollection.findByIdAndRemove(req.params.placeId);
        res.status(200).json('Removed');
    }
}catch(err){
    console.log(err);
    res.status(500).json(err);
}
})