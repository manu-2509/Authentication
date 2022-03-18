const {body,validationResult}= require('express-validator')

const registerValidator = [
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

        if(user){
            throw new Error("User exists")
        }
        return true;
    }),
    body("password")
    .not()
    .isEmpty()
    .withMessage("Please enter your password")
    .bail()
    .isString()
    .withMessage("Not a valid password")
    .bail()
    .custom((value)=>{
        if(value.length<8||value.length>20){
            throw new Error("Max password length 20 & min password length 8")
        }
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if(!re.test(value)){
          throw new Error("Password is not strong enough")
      }
    })
    
]
const RegisterValRes = (req,res,next) => {
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).send({errors:errors.array()});
}
next();
}

module.exports = {RegisterValRes,registerValidator}