// import { STATUS } from "../constants"
export class CustomError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.stausCode = statusCode
  }

  static badRequest(message = 'Bad Request') {
    return new CustomError(400, message)
  }

  static notFound(message = 'Not Found') {
    return new CustomError(404, message)
  }

  static notAllowed(message = 'Not Allowed') {
    return new CustomError(405, message)
  }

  static unauthorized(message = 'Unauthorized') {
    return new CustomError(401, message)
  }

  static forbidden(message = 'Forbidden') {
    return new CustomError(403, message)
  }

  static internalServer(message = 'Internal Server Error') {
    return new CustomError(500, message)
  }
}

