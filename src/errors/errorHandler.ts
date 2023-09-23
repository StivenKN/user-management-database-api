import { type Response } from 'express'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'

export const httpErrorCatch = (res: Response, error: string): Response => {
  return res.status(HttpStatusCode.InternalServerError).json({ error })
}
