import { type Response } from 'express'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'
import { type CustomError } from './customErrorClasses.js'

export const httpErrorCatch = (res: Response, error: CustomError): Response => {
  return res.status(HttpStatusCode.InternalServerError).json({ message: error.message ?? 'Error con la API', code: error.statusCode ?? HttpStatusCode.InternalServerError, header: error.header ?? 'Error' })
}
