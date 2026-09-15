import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { initDb } from './db.js'
import { router } from './routes.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 4000)

app.use(cors({ origin: ['http://localhost:5173'] }))
app.use(express.json())
app.use('/api', router)

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const db = await initDb()

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port} (${db.mode})`)
})
