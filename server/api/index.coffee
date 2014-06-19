mongose = require '../libs/mongoose'
app     = require '../app'
BullshitModel = require '../models/bullshit'


app.get '/', (req, res)->
  limit = BullshitModel.perPage
  skip = if id is 0 || id is 1 then 0 else limit * (id - 1)
  id   = if req.params.id isnt undefined then req.params.id else 0
  res.render('index',{title:'Bullshit Board'})

app.get '/bullshits/:id?', (req, res) ->
  limit = BullshitModel.perPage
  skip = if id is 0 || id is 1 then 0 else limit * (id - 1)
  id   = if req.params.id isnt undefined then req.params.id else 0
  bullshit = BullshitModel.find({}).sort(date: -1).limit(limit).skip(skip).exec (err, bullshits) ->
    if err
      console.log err
    else
      res.json(bullshits)

app.post '/bullshit', (req, res)->
  bullshit = new BullshitModel({
    text: req.body.text
  })
  bullshit.save (err)->
    if err
      console.log 'fail',err
    else
      res.send {status:'success'}
      console.log bullshit
