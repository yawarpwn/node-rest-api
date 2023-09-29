import { SignalModel } from '../models/signals.js'
import { validatePartialSignal } from '../schemas/signals.js'
import { STATUS } from '../constants/index.js'
import { CustomError } from '../errors/custom-error.js'

const handleError = (error, res) => {
  // TODO: winston
  if (error instanceof CustomError) {
    res.status(error.stausCode).json({ error: error.message })
  } else {
    console.log(error)
    res
      .status(STATUS.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error ----' })
  }
}

export class SignalController {
  static async getAll(_req, res) {
    try {
      const signals = await SignalModel.getAll()
      res.status(STATUS.OK).json(signals)
    } catch (error) {
      handleError(error, res)
    }
  }

  static async getById(req, res) {
    const { id } = req.params

    try {
      const signal = await SignalModel.getById({ id})

      if (!signal) {
        throw CustomError.notFound(`Señal con id: ${id} no encontrado`)
      }

      res.status(STATUS.OK).json(signal)
    } catch (error) {
      handleError(error, res)
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params
      const deletedSignal = await SignalModel.delete({ id })

      if(!deletedSignal) {
        throw CustomError.notFound(`Señal con id: ${id} no encontrado`)
      }

      res.status(STATUS.OK).json({ message: 'Registro eliminado' })

    } catch (error) {
      handleError(error, res)
    }
  }

  static async create(req, res) {
    const { body, files } = req

    try {
      const createdSignal = await SignalModel.create({ input: body, files })
      res.status(STATUS.CREATED).json(createdSignal)
    } catch (error) {
      handleError(error, res)
    }
  }

  static async update(req, res) {
    const {
      body,
      files,
      params: { id },
    } = req

    try {
      const udpatedSignal = await SignalModel.update({ input: body, files, id })
      res.status(STATUS.OK).json(udpatedSignal)
    } catch (error) {
      handleError(error, res)
    }
  }
}
