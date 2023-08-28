import { readJson } from '../utils/index.js'
import { randomUUID } from 'node:crypto'
let quotations = readJson('../data/quotations.json')
import {
  validatePartialQuotation,
  validateQuotation,
} from '../schemas/quotations.js'

export class QuotationModel {
  static async getAll() {
    if (quotations) {
      return {
        data: quotations,
        error: null
      }
    }
    return {
      error: 'No quotations',
    }
  }

  static async getById({ id }) {
    const foundQuotation = quotations.find((quo) => quo.id === id)

    if (!foundQuotation) {
      return {
        data: foundQuotation,
        error: `Cotizacion con ID:${id} no encontrada `,
      }
    }
    return {
      data: foundQuotation,
      error: null
    }
  }

  static async create({ input }) {
    const { data, error, success } = validateQuotation(input)
    if (error) {
      return {
        error,
      }
    }
    const newQuotatation = {
      id: randomUUID(),
      ...input,
    }

    //TODO: Guardar en base de datos
    quotations.push(newQuotatation)

    return {
      data,
      error: null
    }
  }

  static async update({ id, input }) {
    const index = quotations.findIndex((quo) => quo.id === id)
    if (index === -1) {
      return { error: 'Cotizacion no encontrada' }
    }

    const { error, message, data } = validatePartialQuotation(input)
    if (data) {
      console.log('data aca ')
      const quotationToUpdate = quotations[index]

      // TODO: Para base de datos
      const quotationToInsert = {
        ...quotationToUpdate,
        ...data,
      }
      quotations[index] = quotationToInsert

      return {
        data: quotationToInsert,
        error: null,
      }
    }

    return {
      error: 'que error',
    }
  }

  static async delete({ id }) {
    const foundQuotation = quotations.find((quo) => quo.id === id)

    if (!foundQuotation) {
      return {
        error: 'Cotizacion no encontrada',
      }
    }

    // TODO: Para base se datos
    quotations = quotations.filter((q) => q.id !== id)

    return {
      data: foundQuotation,
      error: null
    }
  }
}
