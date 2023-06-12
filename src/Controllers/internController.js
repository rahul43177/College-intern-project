const internModel = require('../Models/internModel')
const collegeModel = require('../Models/collegeModel')
const validator = require('validator')

const createIntern = async (req,res) =>{
    try {
        let intern = req.body
        let {name , email , mobile, collegeName } = intern
        if(Object.keys(intern)==0) return res.status(400).send({status : false , message : "Intern details are required"})
        if(!name || !name.trim()) return res.status(400).send({status : false , message : "Name is required"})
        if(!email || !email.trim()) return res.status(400).send({status : false , message : "Email is required"})
        if(!mobile || !mobile.trim()) return res.status(400).send({status : false , message : "Mobile number is required"})
        if(!collegeName || !collegeName.trim()) return res.status(400).send({status : false , message : "College Name is required"})
        if(!validator.isEmail(email)) return res.status(400).send({status : false , message : "Email is not valid"})
        if(!validator.isMobilePhone(mobile)) return res.status(400).send({status : false , message : "Mobile number is not valid"})

        const findCollege = await collegeModel.findOne({name : collegeName})
        if(!findCollege) return res.status(400).send({status : false , message : "College not found"})

        const findInternEmail = await internModel.findOne({email : email})
        if(findInternEmail) return res.status(400).send({status : false , message : "Intern already exists"})

        const findInternMobile = await internModel.findOne({mobile : mobile}) 
        if(findInternMobile) return res.status(400).send({status : false , message : "Intern already exists"})

        const internData = { 
            name : name  ,
            email : email , 
            mobile : mobile ,
            collegeId : findCollege._id
        }

        const createIntern = await internModel.create(internData) 

        const internDataSelect = {
            name : intern.name  ,
            email : intern.email ,
            mobile : intern.mobile ,
            collegeid  : intern.collegeId ,
            isDeleted : intern.isDeleted
        }

        res.status(201).send({status : true , data : internDataSelect})



    } catch(error) {
        res.status(500).send({status : false , error : error.message})
    }
}



const getIntern = async function(req,res) {
    try {
        const collegeName = req.query.collegeName
        if(!collegeName || collegeName.trim()== '') return res.status(400).send({status : false , message : "Collge Name is required"})
        const college = await collegeModel.findOne({name : collegeName})
        if(!college) return res.status(400).send({status : false , message : "College not found"})
        const interns = await internModel.find({collegeId : college._id}).select({name : 1 , email : 1 , mobile : 1})
        const details = {
            name : college.name ,
            fullName : college.fullName ,
            logoLink : college.logoLink ,
            Interns : interns
        }
        res.status(200).send({status : true , data : details})
    } catch(error) {
        res.status(500).send({status : false , error : error.message})
    }
}

module.exports = {createIntern , getIntern}