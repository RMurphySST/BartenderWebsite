require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const recipeRoutes = require('./routes/recipes')
const userRoutes = require('./routes/user')

// Express app
const app = express()

// Middleware to parse JSON
app.use(express.json())

// Middleware to log requests
app.use((req, res, next) => {
    // Log the request
    console.log(req.path, req.method)

    // Move to the next middleware
    next()
})

// Use the recipeRoutes
app.use('/api/recipes', recipeRoutes)

//Use the userRoutes
app.use('/api/user', userRoutes)

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log('Connected to DB & listening on port 4000!')
            })
    })
    .catch(err => {
        console.log(err)
    })
