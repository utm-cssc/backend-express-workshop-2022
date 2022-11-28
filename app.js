const express = require('express')              // imports the express package
const app = express()                           // creates the express app
const router = require('./routes/routes')       // imports our router defined in ./routes/routes

// app listens on localhost port 3000
app.listen(3000)

// boilerplate middleware code needed to access body of requests coming from html forms
app.use(express.urlencoded({ extended: true }))

// to use our router
app.use(router)

// middleware code that renders static pages without needing to define any endpoints
app.use(express.static('public'))

// needed in order to use the templating language, ejs in our html pages
app.set('view engine', 'ejs')
