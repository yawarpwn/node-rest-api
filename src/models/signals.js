import { validateSignal } from '../schemas/senales.js'
import { randomUUID } from 'node:crypto'
import { uploadImage } from '../lib/cloudinary.js'
import { readJson } from '../utils/index.js'

// import mysql from 'mysql2/promise'

// const DEFAULT_CONNECTION = {
//   host: 'localhost',
//   user: 'root',
//   database: 'test.db',
// }
// const DB_CONNECTION = {
//   host: 'aws.connect.psdb.cloud',
//   user: 'c9qvpgzukugfrykw3bfk',
//   database: 'tellsenales_database',
//   password: 'pscale_pw_zuPVP6Cpr9WLFkcjTAEV7RcCLQuvzpRNcF1dEx3pN1u',
// }
//
// const connection = await mysql.createConnection(process.env.DATABASE_URL)

const signalsJson = readJson('../data/signals.json')

export class SignalModel {
  static async getAll() {
    return {
      data: signalsJson,
      error: null,
    }
  }

  static async update() {
    console.log('update')
  }

  static async create({ body, files }) {
    const { data, error } = validateSignal(body)

    if (error) {
      return {
        data: null,
        error,
      }
    }

    if (!files || !files.image) {
      return {
        error: 'No se ha proporcionado ninguna imagen',
        data: null,
      }
    }

      console.log('no deberia entrar aca')
    const { tempFilePath } = files.image
    const publicId = await uploadImage(tempFilePath)

    return {
      data: {
        ...data,
        image: { url: publicId },
      },
      error: null,
    }

    // //TODO: Guardar en base de datos
    // signalsJson.push(newQuotatation)
    // return {
    //   data,
    //   error: null,
    // }
  }
}
