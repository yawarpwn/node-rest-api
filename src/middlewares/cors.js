import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234'
]
const  corsOptions = {
  origin: function (origin, callback) {

    if (ACCEPTED_ORIGINS.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}



export const corsMiddleware = () => cors(corsOptions)



