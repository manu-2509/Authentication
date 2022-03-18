
const User = require('../models/user.models')

var jwt = require('jsonwebtoken');

require('dotenv').config()


generateToken=(user)=>{
    var token = jwt.sign({user},process.env.SECRET_KEY);
}



const register = async(req,res)=>{
    try {
      
       const user = await User.create(req.body)

        const token = generateToken(user)

        return res.status(200).send({user,token})
    } catch (err) {
        return res.status(500).send({message:err.message})
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({email:req.body.email})
        if(!user){
            return res.status(400).send("Wrong email or password")
        }
        const match = user.checkPassword(req.body.password)

        if(!match) {
            return res.status(400).send("Wrong email or password")
        }

        const token = generateToken(user)
        return res.status(200).send({user,token})
    } catch (err) {
        return res.status(400).send({err:err.message})
    }
}

module.exports ={register,login}