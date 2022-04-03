const express = require('express')
const path = require('path')
const app = express()
require('./db/conn.js')
const Register = require('./models/registerSchema')
const PORT = process.env.port||3000
const hbs = require("hbs")
// const static_path = path.join(__dirname,'../public')

// app.use(express.static(static_path))

const template_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

hbs.registerPartials(partials_path)

app.set("view engine","hbs")
app.set("views",template_path)

app.get('/',(req,res)=>{
    res.render('index')
})

app.get('/register',(req,res)=>{
    res.render("register")
})

// Create a new user in our database
app.post('/register',async (req,res)=>{
    try {
        const password = req.body.password
        const cpassword = req.body.cpassword

        if (cpassword!==password){
            res.send("Password do not match")
        }else {
            const newUserRegister = new Register({
                userName:req.body.username,
                email:req.body.email,
                password:req.body.password
            })

            const userSentToDatabase = await newUserRegister.save();
            res.status(201).render("index")
        }
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/login',async (req,res)=>{
    const email = req.body.email
    const password = req.body.password
    const userEmail = await Register.findOne({email:email})
    // res.send(userEmail.password)

    if (password===userEmail.password){
        res.status(201).render("index")
    }else{
        res.send("Credentials do not match")
    }
    console.log(userEmail)
})

app.get('/login',(req,res)=>{
    res.render("login")
})

app.listen(PORT,()=>console.log(`Server Started at port ${PORT}`))