import cors from 'cors'
import express from 'express'
import { quotationsRouter } from './routes/quotations.js'
import { signalsRouter } from './routes/signals.js'
import fileUpload from 'express-fileupload'
import 'dotenv/config'

const app = express()

// Middleware para manejar manejo de cors
app.use(cors())

// Middleware para manejar de json
app.use(express.json())
// Middleware para manejar la carga de archivos
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  }),
)

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
