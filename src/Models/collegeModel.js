const mongoose = require('mongoose')

const collegeSchema = new mongoose.Schema({
    name : {
        type :  String , 
        required : [true , "College name is required"] ,
        trim : true , 
        unique : true
    } ,
    fullName : {
        type : String , 
        required : [true , "Full name required"] ,
        trim : true
    } ,
    logoLink : {
        type : String , 
        required : [true , "Logo link is required"] ,
        trim : true 
    } ,
    isDeleted : {
        type : Boolean , 
        required : true ,
        default : false
    } 
}, { timestamps : true} )


module.exports = mongoose.model('College' , collegeSchema)