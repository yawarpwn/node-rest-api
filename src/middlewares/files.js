import fileUpload from 'express-fileupload'

export const filesMiddleware = () =>
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
