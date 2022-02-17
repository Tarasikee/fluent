const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const routes = require('./routes')
const app = express()

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected'))
    .catch(err => console.log(err))

app.use(passport.initialize())
require('./middlewares/passport')(passport)

//Utils
app.use(require('morgan')('dev'))
app.use('/static', express.static('static'))
app.use(express.json())
app.use(require('cors')({origin: '*'}));

//Routes
app.use('/api/analytics', routes.analyticsRoutes)
app.use('/api/auth', routes.authRoutes)
app.use('/api/category', routes.categoryRoutes)
app.use('/api/order', routes.orderRoutes)
app.use('/api/position', routes.positionRoutes)

module.exports = app
