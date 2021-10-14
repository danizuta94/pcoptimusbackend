'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TestimonioSchema = Schema({
    name: String,
    comment: String,
    img: String,
    date: Number,
    email: String,
    publico: Boolean
})

module.exports = mongoose.model('Testimonio', TestimonioSchema)