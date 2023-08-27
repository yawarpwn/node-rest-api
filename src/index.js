import express from 'express'
import cors from 'cors'
import { randomUUID } from 'node:crypto'
import {
  validatePartialQuotation,
  validateQuotation,
} from './schemas/quotations.js'

import { readJson } from './utils/index.js'
let quotations = readJson('../data/quotations.json')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).end('<h1>Node App</h1>')
})

// Ruta para recupear las cotizaciones
app.get('/quotations', (_req, res) => {
  res.status(200).json(quotations)
})

// Ruta para recupear una cotizacion por id
app.get('/quotations/:id', (req, res) => {
  const { id } = req.params
  const fondQuotation = quotations.find((quo) => quo.id === Number(id))

  if (!fondQuotation) {
    res.status(404).json({
      message: 'Recurso no encontrado',
    })
  }

  res.status(200).json(fondQuotation)
})

// Ruta para crear una nueva cotizacion
app.post('/quotations', (req, res) => {
  const { body } = req
  const { data, error, success } = validateQuotation(body)

  if (error) {
    // Respuesta de error para validación de cotización fallida
    res.status(400).json({
      success,
      error,
    })

    return
  }

  const newQuotatation = {
    id: randomUUID(),
    ...data,
  }

  //TODO: Guardar en base de datos
  quotations.push(newQuotatation)

  res.status(201).json({
    success,
    data,
  })
})

// Ruta para actualizar Parcialmente una cotizacion por id
app.patch('/quotations/:id', (req, res) => {
  const { id } = req.params
  const { body } = req
  const index = quotations.findIndex((quo) => quo.id === id)

  if (index === -1) {
    // Respuesta de error para cotización no encontrada
    console.log('errror')
    res.status(404).json({
      message: 'Cotizacion no encontrada',
    })

    return
  }

  const foundQuotation = quotations[index]
  const { error, message, data } = validatePartialQuotation(body)

  if (error) {
    // Respuesta de error para validación parcial de cotización fallida
    res.status(400).json({
      message,
      error,
    })

    return
  }

  // TODO: Para base de datos
  const quotationToUpdate = {
    ...foundQuotation,
    ...data,
  }
  quotations[index] = quotationToUpdate

  res.status(200).json(quotationToUpdate)
})

// Ruta para borrar una cotizacion por id
app.delete('/quotations/:id', (req, res) => {
  const { id } = req.params
  const foundQuotation = quotations.find((quo) => quo.id === id)

  if (!foundQuotation) {
    // Respuesta de error para cotización no encontrada
    res.status.json({
      message: 'Cotizacion no encotrada',
    })
  }

  // TODO: Para base se datos
  quotations = quotations.filter((q) => q.id !== id)

  res.status(200).json({
    message: 'Cotizacion eliminada',
    data: foundQuotation,
  })
})

app.use( (req, res, next) => {
  res.status(404)
  res.end('Not Found')

})

const PORT = process.env.PORT ?? 8080

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
