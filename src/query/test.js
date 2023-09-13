import crypto from 'node:crypto'
import sqlite from 'sqlite3'
import { readJson } from '../utils/index.js'

const productsJson = readJson('../query/products-data.json')
const { Database } = sqlite

const db = new Database('./test.db', sqlite.OPEN_READWRITE, (error) => {
  if (error) {
    console.log('error', error)
  }
  console.log('Database running')
})

function getAllProducts() {
  const sqlQuery = `
    SELECT * FROM products;
  `

  return new Promise((resolve, reject) => {
    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        reject(err)
      } else {
        resolve(rows)
      }
    })
  })
}

function insertProduct({ code, price, cost, unitSize, category, description }) {
  const id = crypto.randomUUID()
  const querySql = `
    INSERT INTO 
    products (id, description, code, cost, price, category, unit_size) 
    VALUES(?,?, ?, ?, ?, ?,?); 
  `

  db.run(
    querySql,
    [id, description, code, cost, price, category, unitSize],
    (error) => {
      if (error) {
        console.log(error.message)
      }

      console.log('producto insertador')
    },
  )
}

function insertAllProducts() {
  productsJson.forEach((prod) => {
    const {
      code,
      price,
      cost,
      unit_size: unitSize,
      category,
      description,
    } = prod
    insertProduct({ code, price, cost, unitSize, category, description })
  })
}

getAllProducts()
.then(res => console.log(res))
.catch(err => console.log(err))
// getAllProducts()

//   // close the database connection
// db.close((err) => {
//   if (err) {
//     return console.error(err.message);
//   }
//   console.log('Close the database connection.');
// })
