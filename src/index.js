import express from 'express'
import { quotationsRouter } from './routes/quotations.js'
import { signalsRouter } from './routes/signals.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

// TODO:
const app = express()

// Middlewares
app.use(corsMiddleware())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).end('<h1>Node App</h1>')
})

app.use('/quotations', quotationsRouter)
app.use('/signals', signalsRouter)

app.use((_, res) => {
  res.status(404)
  res.end('Not Found')
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
