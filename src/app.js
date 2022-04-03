const express = require('express')
const path = require('path')
const app = express()
require('./db/conn.js')
const PORT = process.env.port||3000

const static_path = path.join(__dirname,'../public')

app.use(express.static(static_path))

app.get('/',(req,res)=>{
    res.send('Hello everyone')
})

app.listen(PORT,()=>console.log(`Server Started at port ${PORT}`))