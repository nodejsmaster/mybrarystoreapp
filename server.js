if (process.env.NODE_ENV==='development') require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

// View engine
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

// Public files
app.use(express.static('public'))

// Routes
app.use('/', require('./routes/index'))

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('MongoDB Connected'))

const PORT = process.env.PORT || 3000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))