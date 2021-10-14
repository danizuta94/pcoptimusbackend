'use strict'

var express = require('express')
var TestimoniosController = require('../controllers/TestimoniosController')

var router = express.Router()

router.get('/testimonios', TestimoniosController.index)

module.exports = router
