const express = require('express')
const router = express.Router()


router.get('/rahul',function(req,res){
    res.send({name : "Rahul"})   
})







module.exports = router