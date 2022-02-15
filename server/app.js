const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const app = express();

mongoose.connect(process.env.mongoURI)
    .then(() => console.log('Connected'))
    .catch(err => console.log(err))

//Utils
app.use(require('morgan')('dev'))
app.use(express.json())
app.use(require('cors')())

//Routes
app.use('/api/analytics', routes.analyticsRoutes)
app.use('/api/auth', routes.authRoutes)
app.use('/api/category', routes.categoryRoutes)
app.use('/api/order', routes.orderRoutes)
app.use('/api/position', routes.positionRoutes)

module.exports = app;
