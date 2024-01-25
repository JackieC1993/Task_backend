const express = require('express')
const cors = require('cors')
const app = express()
const tasksController = require('./controllers/tasksController')

//Middleware
app.use(cors())
app.use(express.json())
app.use('/tasks', tasksController)

app.get('/', (req, res) => {
    res.json({index: "This is the index page" })
})


module.exports = app