mongoose = require 'mongoose'

mongoose.connect('mongodb://localhost/Bullshit')
db = mongoose.connection

module.exports = mongoose



