mongoose = require '../libs/mongoose'

Bullshit = new mongoose.Schema({
  text: {type: String, require: 'true'}
  date: {type: Date, default: Date.now}
})

ModelBullshit = mongoose.model('Bullshit',Bullshit)
ModelBullshit.perPage = 10

module.exports = ModelBullshit