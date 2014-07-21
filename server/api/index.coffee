mongose = require '../libs/mongoose'
app     = require '../app'
BullshitModel = require '../models/bullshit'
sanitizer = require 'sanitizer'

app.get '/', (req, res)->
  res.render 'index',{title:'Bullshit Board'}


app.get '/bullshits/:id?', (req, res) ->
  limit = BullshitModel.perPage
  id   = if req.params.id isnt undefined then req.params.id else 0
  skip = if id is 0 then 0 else limit * id
  bullshit = BullshitModel.find({}).sort(date: -1).limit(limit).skip(skip).exec (err, bullshits) ->
    if err
      console.log err
    else
      res.json(bullshits)

app.get '/bullshits/search/:text', (req,res)->
  text = req.params.text
  BullshitModel.find {text: {$regex: new RegExp("#{text}", "i")}}, (err, bullshits) ->
    if err
      console.log err
    else
      res.json(bullshits)

app.get '/bullshit/:id', (req, res) ->
  id = req.params.id
  BullshitModel.findById id, (err, bullshit) ->
    res.render 'bullshit',{title:'Bullshit Board',bullshit: JSON.stringify bullshit}

app.post '/bullshit', (req, res)->
  text = sanitizer.sanitize(req.body.text)
  text = text.slice 0,400
  ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
  bullshit = new BullshitModel({
    text: text,
    date: Date.now(),
    ip:   ip
  })
  if req.cookies.banForHour isnt  'true'
    bullshit.save (err)->
      if err
        console.log 'fail',err
      else
#        res.cookie 'banForHour', true, { maxAge: 3600000, path: '/' }
        res.send {status:'success'}
        console.log bullshit

app.delete '/bullshit/:id', (req,res) ->
  if req.cookies.admin is 'IDKFA'
    BullshitModel.findById(req.params.id).remove().exec()
    res.json {status:'succes'}

app.get '/giveMeAPower/:password', (req,res) ->
  if req.params.password is 'IDKFA'
    res.cookie 'admin', 'IDKFA', { maxAge: 3600000, path: '/' }
    res.redirect('/')