import jwt from 'jsonwebtoken'

export function generateToken  (payload, duration) {
  return new Promise((resolve) => {
    jwt.sign(payload, 'SEED', {expiresIn: duration}, (error, encoded) => {
      if(error) {
        resolve(null)
      }
      resolve(encoded)
    })
  })
}

export function validateToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, 'SEED', (error, payload) => {
      if (error) {
        reject(error)
      }
      resolve(payload)
    })
  })
}


