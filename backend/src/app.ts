import express from 'express'
import bodyParser from 'body-parser'

import parseRouter from './routers/parse'

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Example route:
app.use('/parse', parseRouter)

export default app
