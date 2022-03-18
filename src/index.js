const express = require('express')

const postControllers = require('./controllers/post.controllers')
const {loginValRes,loginValidator} = require('./middlewares/login.validator')
const {RegisterValRes,registerValidator} = require('./middlewares/register.validator')
const {register,login}= require('./controllers/auth.controller')

const app = express();

   
app.use(express.json())


app.post('/login', loginValidator,loginValRes,login)
app.post('/register', registerValidator,RegisterValRes,register)


app.use("/posts",postControllers);

module.exports=app
