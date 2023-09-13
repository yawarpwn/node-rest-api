import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()


// simple query
// connection.query('show tables', function (err, results, fields) {
//   console.log(results) // results contains rows returned by server
//   console.log(fields) // fields contains extra metadata about results, if available
// })

async function main () {

// Create the connection to the database
  const connection = await mysql.createConnection(process.env.DATABASE_URL)

  const [rows, fields] = await connection.execute(`SELECT * FROM test`)
  console.log({rows, fields})

  // connection.end
}

main()
//
