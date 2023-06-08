const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const {PORT ,MONGOOSE_PORT} =  process.env
const route = require('./route/route')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


mongoose.connect(MONGOOSE_PORT)
.then(()=>console.log('MongoDB is connected'))
.catch((error)=>error)

app.use('/',route)

app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`)
})



