const express = require('express')
require('dotenv').config()
const workouts = require('./workoutsTest')

const app = express()

const port = process.env.PORT

app.use(express.json())

app.use('/workouts/api',workouts)

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})