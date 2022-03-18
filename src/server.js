
const  connect  = require('./configs/db')

const app = require("./index")

app.listen(5544,async()=>{
   
    try {
        await connect();
         console.log("Listening to port 5544")
    } catch (err) {
        console.log(err.message)
    }
   
});