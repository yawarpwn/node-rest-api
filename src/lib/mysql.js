import mysql from 'mysql2/promise'
import { envs } from '../config/envs.js'

const connection = await mysql.createConnection(envs.DATABASE_URL)

export async function updateRow({ table, rowToUpdate, id }) {
  // Construye la consulta SQL para actualizar el registro
  const updateQuery = `UPDATE ${table} SET ? WHERE id = ?`

  // Ejecuta la consulta SQL
  const [result] = await connection.query(updateQuery, [rowToUpdate, id])

  // Verifica si se actualizó correctamente
  if (result.affectedRows === 1) {
    console.log(`Registro actualizado en la tabla ${table}`)
    return true // Devuelve true para indicar que la actualización fue exitosa
  } else {
    console.error(`No se pudo actualizar el registro en la tabla ${table}`)
    return false // Devuelve false para indicar que la actualización falló
  }
}

export async function getRows({ table }) {
  const [rows] = await connection.query(`SELECT * FROM  ${table}`)
  console.log({ rows })
  return rows
}

export async function getRow({ id, table }) {
  const selectQuery = `SELECT * FROM ${table} WHERE id = ?`
  const [rows] = await connection.query(selectQuery, [id])

  if (rows.length === 0) {
    return null
  }

  return rows[0]
}

export async function deleteRow({ table, id }) {
  const deleteQuery = `DELETE FROM ${table} WHERE id = ?`
  const [rows] = await connection.query(deleteQuery, [id])

  if (rows.affectedRows === 1) {
    return true
  }

  return false
}

export async function insertRow({ rowToInsert, table }) {
  const insertQuery = `INSERT INTO ${table} SET ?`
  const [result] = await connection.query(insertQuery, [rowToInsert])

  if (result.affectedRows === 1) {
    return true
  } else {
    console.log('no inserted')
    return false
  }
}

// export async function insertRow({ rowToInsert, table }) {
//   const values = Object.values(rowToInsert)
//   const keys = Object.keys(rowToInsert)

//   const placeholders = values.map(() => '?').join(', ')

//   const query = `
//     INSERT INTO ${table} (${keys.join(', ')})
//     VALUES (${placeholders})
//   `

//   console.log('insertRow ', query, values)

//   const [rows] = await connection.query(query, values)

//   if (!rows) {
//     return null
//   }

//   return rows
// }
