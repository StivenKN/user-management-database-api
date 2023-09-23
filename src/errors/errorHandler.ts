import { type Response } from 'express'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'
import { type CustomError } from './customErrorClasses.js'

export const httpErrorCatch = (res: Response, error: CustomError): Response => {
  return res.status(HttpStatusCode.InternalServerError).json({ message: error.message, code: error.statusCode, header: error.header })
}
