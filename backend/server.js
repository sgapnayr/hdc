const express = require('express')
const Nylas = require('nylas')
const cors = require('cors')
const debug = require('debug')('backend:server')
require('dotenv').config()

// ? CONFIGURATION
const app = express()
const port = 3000 // You can choose any port number you prefer
Nylas.config({ clientId: process.env.NYLAS_CLIENT_ID, clientSecret: process.env.NYLAS_CLIENT_SECRET })

// * MIDDLEWARE
app.use(cors())

// ! ENDPOINTS
app.get('/getAllEvents', async (req, res) => {
  try {
    const nylas = Nylas.with(process.env.NYLAS_ACCESS_TOKEN)
    const events = await nylas.events.list()
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve events' })
  }
})

// TODO SERVER
app.listen(port, () => {
  debug(`Server listening on port ${port}`)
})
