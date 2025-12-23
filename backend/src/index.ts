import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { registerInterfaces, startServer } from './utils'
import dotenv from 'dotenv'
dotenv.config()

// import { logger } from './utils/index.js'
// import { generate_v1_interface } from './interface.js'
import { loadWebSocket } from './webSocket'
import { loadSSE } from './sse'

import interfaces from './interfaces'

const app = express()
app.use(cors({ origin: '*' }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

registerInterfaces(app, interfaces)
loadSSE(app)
loadWebSocket()
// generate_v1_interface(app)

// app.use(express.static(path.join(__dirname, "dist")));

startServer(app)
