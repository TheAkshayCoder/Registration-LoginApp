const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// Creating collections 
const Register = new mongoose.model("User",dataSchema)

module.exports=Register