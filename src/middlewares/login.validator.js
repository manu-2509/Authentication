const {body,validationResult}= require('express-validator')

const loginValidator = [
    body("name")
    .not()
    .isEmpty()
    .withMessage("Please enter your name")
    .bail()
    .isString()
    .withMessage("Name cannot be a number")
    .bail(),
    body("email")
    .not()
    .isEmpty()
    .withMessage("Please enter your email address")
    .bail()
    .isEmail()
    .withMessage("Not a valid email address")
    .bail()
    .custom(async(value)=>{
        const user = await User.findOne({email: value});

        if(!user){
            throw new Error("User does not exist. Please Sign up")
        }
        return true;
    }),
    body("password")
    .isString()
    .withMessage("Not a valid password")
    .bail()
    .custom((value)=>{
        if(value.length<8||value.length>20){
            throw new Error("Max password length 20 & min password length 8")
        }
    })
    
]
const loginValRes = (req,res,next) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).send({errors:errors.array()});
}
next();
}

module.exports = {loginValRes,loginValidator}