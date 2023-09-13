import { QuotationModel } from '../models/quotations.js'
export class QuotationController {
  static async getAll(_req, res) {
    const { data, error } = await QuotationModel.getAll()


    if (error) {
      res.status(404).json({ error })
    }

    res.status(200).json(data)
  }

  static async getById(req, res) {
    const { id } = req.params
    const { data, error } = await QuotationModel.getById({ id })
    console.log({ data, error })

    if (error) {
      res.status(404).json({
        message: 'Recurso no encontrado',
      })
    }

    res.status(200).json(data)
  }

  static async create(req, res) {
    const { body } = req
    const { data, error } = await QuotationModel.create({ input: body })

    if (error) {
      // Respuesta de error para validación de cotización fallida
      res.status(400).json({
        error,
      })

      return
    }

    res.status(201).json(data)
  }

  static async update(req, res) {
    const { id } = req.params
    const { body } = req

    const { data, error } = await QuotationModel.update({ id, input: body })

    if (error) {
      // Respuesta de error para cotización no encontrada
      res.status(404).json({
        message: error,
      })

      return
    }

    res.status(200).json(data)
  }

  static async delete(req, res) {
    const { id } = req.params
    const { data, error } = await QuotationModel.delete({ id })

    if (error) {
      // Respuesta de error para cotización no encontrada
      res.status(404).json({
        error
      })
    }

    res.status(200).json({
      message: 'Cotizacion eliminada',
      data,
    })
  }
}
