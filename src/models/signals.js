import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

// database: tellsenales_database
// username: c9qvpgzukugfrykw3bfk
// host: aws.connect.psdb.cloud
// password: pscale_pw_zuPVP6Cpr9WLFkcjTAEV7RcCLQuvzpRNcF1dEx3pN1u
//
const DEFAULT_CONNECTION = {
  host: 'localhost',
  user: 'root',
  database: 'test.db',
}
const DB_CONNECTION = {
  host: 'aws.connect.psdb.cloud',
  user: 'c9qvpgzukugfrykw3bfk',
  database: 'tellsenales_database',
  password: 'pscale_pw_zuPVP6Cpr9WLFkcjTAEV7RcCLQuvzpRNcF1dEx3pN1u',
}

const connection = await mysql.createConnection(process.env.DATABASE_URL)
// const connection =  mysql.createPool(DB_CONNECTION)

export class SignalModel {
  static async getAll() {
    const [rows, fields] = await connection.query(`SELECT * FROM test`)
    console.log(rows)
    return {
      data: rows,
      error: null,
    }
  }

  static async update() {
    console.log('update')
  }
}
