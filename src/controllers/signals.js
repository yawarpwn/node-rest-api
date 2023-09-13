import { SignalModel } from '../models/signals.js'

export class SignalController {
  static async getAll(_req, res) {
    const { data, error } = await SignalModel.getAll()

    if (error) {
      res.status(404).json(error)
    }

    res.status(200).json(data)
  }
}
