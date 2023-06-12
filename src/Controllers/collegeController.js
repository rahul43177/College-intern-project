const collegeModel = require ('../Models/collegeModel')

const createCollege = async (req,res) => {
    try {
        const college = req.body
        let {name , fullName , logoLink} = college
        //check wheather the body is there or not
        if(Object.keys(college).length === 0) return res.status(400).send({status : false , message : "Data is required for adding College"})
        if(!name || !name.trim()) return res.status(400).send({status : false , message : "Name is required"})
        if(!fullName || !fullName.trim()) return res.status(400).send({status : false , message  : "Full name is required"})
        if(!logoLink) return res.status(400).send({status : false , message : "Logo link is required"})
        if(!url_valid(logoLink)) return res.status(400).send({status : true , message  : "Please enter a valid logo link"})

        const collegeExist = await collegeModel.findOne({name : name})
        if(collegeExist) return res.status(400).send({status : false , message : "College already present"})

        let createCollege = await collegeModel.create(college)
        res.status(201).send({status : true , data : createCollege})

    } catch(error){
        res.status(500).send({status : false , error : error.message})
    }
}

const url_valid = function(url) {
    let regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
    return regex.test(url)
}

module.exports.createCollege = createCollege