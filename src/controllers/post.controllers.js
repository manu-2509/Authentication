const Post  = require("../models/post.models")

const express = require("express") 

const authenticate = require("../middlewares/authenticate")


const router = express.Router()

router.get("",authenticate,async(req, res)=>{
    try {
        const user =await Post.find().lean().exec;
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send({err: err.message});
    }
})


router.post("",authenticate,async(req, res)=>{
    req.body.userId=req.userId
    try {
        const user =await Post.create(req.body);
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send({err: err.message});
    }
})

router.patch("",authenticate,async(req, res)=>{
    req.body.userId=req.userId
    try {
        const user =await Post.findByIdAndUpdate(req.body.userId,req.body,{new:true}).lean().exec();
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send({err: err.message});
    }
})

router.delete("",authenticate,async(req, res)=>{
    req.body.userId=req.userId
    try {
        const user =await Post.findByIdAndDelete(req.body.userId);
        return res.status(200).send(user)
    } catch (err) {
        return res.status(500).send({err: err.message});
    }
})

module.exports = router