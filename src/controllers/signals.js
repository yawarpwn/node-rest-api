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

  constructor({signalModel}) {
    console.log({signalModel})
    this.signalModel = signalModel
  }

  getAll = async (_req, res) => {
    try {
      const signals = await this.signalModel.getAll()
      res.status(STATUS.OK).json(signals)
    } catch (error) {
      handleError(error, res)
    }
  }

   getById = async (req, res) => {
    const { id } = req.params

    try {
      const signal = await this.signalModel.getById({ id})

      if (!signal) {
        throw CustomError.notFound(`Señal con id: ${id} no encontrado`)
      }

      res.status(STATUS.OK).json(signal)
    } catch (error) {
      handleError(error, res)
    }
  }

   delete = async (req, res) => {
    try {
      const { id } = req.params
      const deletedSignal = await this.signalModel.delete({ id })

      if(!deletedSignal) {
        throw CustomError.notFound(`Señal con id: ${id} no encontrado`)
      }

      res.status(STATUS.OK).json({ message: 'Registro eliminado' })

    } catch (error) {
      handleError(error, res)
    }
  }

   create = async (req, res) => {
    const { body, files } = req

    try {
      const createdSignal = await this.signalModel.create({ input: body, files })
      res.status(STATUS.CREATED).json(createdSignal)
    } catch (error) {
      handleError(error, res)
    }
  }

   update = async (req, res) => {
    const {
      body,
      files,
      params: { id },
    } = req

    try {
      const udpatedSignal = await this.signalModel.update({ input: body, files, id })
      res.status(STATUS.OK).json(udpatedSignal)
    } catch (error) {
      handleError(error, res)
    }
  }
}
