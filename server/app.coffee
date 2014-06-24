express        = require 'express'
bodyParser     = require 'body-parser'
methodOverride = require 'method-override'
morgan         = require 'morgan'
favicon        = require 'serve-favicon'
cookieParser   = require 'cookie-parser'
path           = require 'path'

app = express()
app.use favicon(path.join(__dirname,'../public','img','Fav-Bullshit.png'));
app.use cookieParser('SAJdjnxsUI')
app.use bodyParser.urlencoded()
app.use bodyParser.json()
app.use methodOverride 'X-HTTP-Method-Override'
app.use morgan()
app.use express.static(path.join(__dirname, "../public"))

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')

module.exports = app

api = require './api'
