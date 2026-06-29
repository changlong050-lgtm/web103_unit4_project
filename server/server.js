import express from 'express'
import path from 'path'
import './config/dotenv.js'

// import the router from your routes file



const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())



// specify the api path for the server to use


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})