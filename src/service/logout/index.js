const express = require ('express');
const passport = require('passport');
const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        console.log('logging out');
        req.logOut();
        res.redirect('/login');;
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;