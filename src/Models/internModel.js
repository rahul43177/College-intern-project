const mongoose = require('mongoose')

const internSchema = new mongoose.Schema({
    name : {
        type : String , 
        required : [true , "Name is mandatory"] ,
        trim : true
    } ,
    email : {
        type : String , 
        required : [true , "Email is mandatory"] ,
        unique : [true , "Email already present"] ,
        match : [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , "Please enter a valid Email ID"    ]
    } ,
    mobile : {
        type : String , 
        required : [true , "Mobile number is madatory"] ,
        trim : true , 
        unique : true , 
        match : [/^[6-9]\d{9}$/,
        "Invalid phone number, Please try with a valid phone number."
        ]   
    } , 
    collegeId : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "College" ,
        required : [true , "Intern's logo is required"]
    } ,
    isDeleted : {
        type : Boolean , 
        required : true , 
        default : false 
    }
}, {timestamps : true})


module.exports = mongoose.model('Intern', internSchema)




