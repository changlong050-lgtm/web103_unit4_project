import express from 'express'
import path from 'path'
import './config/dotenv.js'
import carsRouter from './routes/carsRoute.js'
// import the router from your routes file



const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/cars', carsRouter)

// specify the api path for the server to use



app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})