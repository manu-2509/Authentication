const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    }
})


const Post = mongoose.model('post',postSchema)

module.exports = Post