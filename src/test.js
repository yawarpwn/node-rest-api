import express from 'express'
import cors from 'cors'
const app = express() 

const corsMiddleware = () => {
  return cors({
    origin: (origin, callback) => {
      console.log(origin)
      callback(null, true)
    } 
  })
}

// app.use(corsMiddleware())
app.get('/auth', corsMiddleware(), (req, res) => {
  res.json({ auth: true })
  
})

app.listen(1234, () => {
  console.log('server running')
} )

// const fs = require('fs')

// function fib(n) {
//   if (n < 2) {
//     return n
//   }
//   return fib(n - 1) + fib(n - 2)
// }

// const x = fib(6)
// const y = fib(10)

// console.log('x: ', x, '| y: ', y)


