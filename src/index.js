import express from 'express'
import { quotationsRouter } from './routes/quotations.js'
import { createSignalRoute } from './routes/signals.js'
import { corsMiddleware } from './middlewares/cors.js'
import { SignalModel } from '../src/models/signals.js'

// TODO:
const app = express()
const signalsRouter = createSignalRoute({signalModel: SignalModel})

// Middlewares
app.use(corsMiddleware())
app.use(express.json())

app.get('/', (_, res) => {
  res.status(200).end('<h1>Node App</h1>')
})

app.use('/quotations', quotationsRouter)
app.use('/signals', signalsRouter)

app.use((_, res) => {
  res.status(404)
  res.end('Not Found')
})

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
