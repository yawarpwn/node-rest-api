import { randomUUID } from 'node:crypto'
import { destroyImage, uploadImage } from '../lib/cloudinary.js'
import {
  deleteRow,
  getRow,
  getRows,
  insertRow,
  updateRow,
} from '../lib/mysql.js'
import { CustomError } from '../errors/custom-error.js'
import { validatePartialSignal, validateSignal } from '../schemas/signals.js'

// const DEFAULT_CONNECTION = {
//   host: 'localhost',
//   user: 'root',
//   database: 'test.db',
// }
const SIGNALS_TABLE = 'signals'
export class SignalModel {
  static async getAll() {
    const signals = await getRows({ table: 'signa' })
    if (!signals) CustomError.notFound()
    return signals
  }

  static async getById({ id }) {
    if (!id) {
      throw CustomError.badRequest('Missing Señal ID')
    }

    const signal = await getRow({ id, table: SIGNALS_TABLE })
    console.log('signal: ', signal)
    return signal
  }

  static async delete({ id }) {
    if (!id) {
      throw CustomError.badRequest('missing id')
    }

    // Busca la senal en base datos
    const foundSignal = await getRow({ id, table: SIGNALS_TABLE })
    if (!foundSignal) throw CustomError.notFound('Signal not found')

    // delete image from cloudinary
    await destroyImage(foundSignal.image_src)

    // delete from database
    const deletedSignal = await deleteRow({ table: SIGNALS_TABLE, id })
    return deletedSignal
  }

  static async update({ input, id, files }) {
    if (!id) {
      throw CustomError.badRequest('missing id')
    }

    // validacion parcial de datos
    const { data, error } = validatePartialSignal(input)
    if (error) throw CustomError.badRequest(error)

    // Busca la senal en base datos
    const foundSignal = await getRow({ id, table: SIGNALS_TABLE })
    if (!foundSignal) throw CustomError.notFound('Signal not found')

    // en caso image proporcionado
    if (files && files.image) {
      console.log('with files')
      await destroyImage(foundSignal.image_src)

      const { tempFilePath } = files.image

      //Carga de imagen a cloudinary
      const uploadResult = await uploadImage(tempFilePath, {
        folder: `senales/${foundSignal.category}`,
        fileName: input.title,
      })

      const signalToUpdate = {
        ...foundSignal,
        ...data,
        image_src: uploadResult.public_id,
        image_url: uploadResult.secure_url,
        image_width: uploadResult.width,
        image_height: uploadResult.height,
        image_format: uploadResult.format,
      }

      const updatedSignal = await updateRow({
        table: SIGNALS_TABLE,
        rowToUpdate: signalToUpdate,
        id,
      })

      return updatedSignal
    }

    console.log('without files')
    const signalToUpdate = {
      ...foundSignal,
      ...data,
    }

    const updatedSignal = await updateRow({
      table: SIGNALS_TABLE,
      rowToUpdate: signalToUpdate,
      id,
    })

    if (!updatedSignal)
      throw CustomError.internalServer('Error updating signal')

    return signalToUpdate
  }

  static async create({ input, files }) {
    // Validacion de datos con Zod
    const { data, error } = validateSignal(input)

    // Si la validacion de zod falla
    if (error) {
      // TODO: Tratar errores zod
      // console.log('Error Zod', error)
      throw CustomError.badRequest(error)
    }

    // Si no hay file image
    if (!files || !files.image) {
      throw CustomError.badRequest('Files is required')
    }

    const { tempFilePath } = files.image

    //Carga de imagen a cloudinary
    const uploadResult = await uploadImage(tempFilePath, {
      folder: `senales/${input.category}`,
      fileName: input.title,
    })

    // Si no se pudo subir
    if (!uploadResult) {
      throw CustomError.internalServer('Error uploading image')
    }

    // Objecto para insertar a base de datos
    const signalToCreate = {
      id: randomUUID(),
      title: data.title,
      code: data.code,
      category: data.category,
      image_src: uploadResult.public_id,
      image_url: uploadResult.secure_url,
      image_width: uploadResult.width,
      image_height: uploadResult.height,
      image_format: uploadResult.format,
    }

    // Insertar en base de datos
    const isInserted = await insertRow({
      table: SIGNALS_TABLE,
      rowToInsert: signalToCreate,
    })

    if (!isInserted) {
      throw CustomError.internalServer('Error inserting signal')
    }

    return signalToCreate
  }
}
