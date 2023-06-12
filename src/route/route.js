const express = require('express')
const router = express.Router()
const {createCollege} = require('../Controllers/collegeController')
const {createIntern , getIntern} = require('../Controllers/internController')

router.post('/colleges', createCollege)

router.post('/interns', createIntern)
router.get('/collgeDetails', getIntern)


module.exports = router