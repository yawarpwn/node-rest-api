import express from 'express'
import cors from 'cors'
const app = express() 

class Model {
  static async getAll() {
    return [{ a: '1'}, { b: '2'}]
  }
}

class Controller {
  constructor({ model }) {
    this.model = model
  }

  static async getAll (req, res)  {
    res.status(200).json(await this.model.getAll())
  }

}

const controller = new Controller({model: Model})
// app.use(corsMiddleware())
app.get('/auth' , controller.getAll) 

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


