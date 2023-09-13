import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const connection = await mysql.createConnection(process.env.DATABASE_URL)


export class SignalModel {
  static async getAll() {
    const [rows, fields] = await connection.execute(`SELECT * FROM test`)
    return {
      data: rows,
      error: null,
    }
  }

  static async update() {
    console.log('update')
  }
}
