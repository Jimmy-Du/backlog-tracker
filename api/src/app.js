const express = require('express')
const cors = require('cors')
const userRoute = require('./routers/user')
const gameRoute = require('./routers/game')
const backlogRoute = require('./routers/backlog')
const passport = require('passport')
require('./db/mongoose')

const app = express()

// Setup express options
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// Setup passport authentication
app.use(passport.initialize())
require('./config/passport-config')(passport)

app.use(cors())

// Setup api routes
app.use(userRoute)
app.use(gameRoute)
app.use(backlogRoute)

module.exports = app