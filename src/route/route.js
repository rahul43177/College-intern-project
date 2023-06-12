const express = require('express')
const router = express.Router()
const {createCollege} = require('../Controllers/collegeController')
const {createIntern , getIntern} = require('../Controllers/internController')

router.post('/functionup/colleges', createCollege)

router.post('/functionup/interns', createIntern)
router.get('/functionup/collegeDetails', getIntern)


module.exports = router