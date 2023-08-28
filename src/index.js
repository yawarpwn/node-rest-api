import express from 'express'
import cors from 'cors'
import { quotationsRouter } from './routes/quotations.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).end('<h1>Node App</h1>')
})

app.use('/quotations', quotationsRouter)

app.use((_, res) => {
  res.status(404)
  res.end('Not Found')
})

const PORT = process.env.PORT ?? 3000 

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
