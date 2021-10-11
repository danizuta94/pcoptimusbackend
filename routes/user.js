'use strict'

var passport = require("passport");

var express = require('express')
var UserController = require('../controllers/UserController')

var router = express.Router()

router.get('/user', passport.authenticate("jwt", { session: false }), UserController.index)
router.get('/user/:id?', passport.authenticate("jwt", { session: false }), UserController.show)
router.post('/user', UserController.store)
router.put('/user/:id?', passport.authenticate("jwt", { session: false }), UserController.update)
router.delete('/user/:id?', passport.authenticate("jwt", { session: false }), UserController.delete)

module.exports = router
