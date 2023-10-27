import { type Request, type Response } from 'express'
import { httpErrorCatch } from '../errors/errorHandler.js'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'
import { pool } from '../config/dbconection.js'
import { APIError } from '../errors/customErrorClasses.js'

export const saveKeyToDatabase = async (req: Request, res: Response): Promise<string | Response> => {
  const publicKey = req.headers['x-public-key']
  try {
    const [query] = await pool.query('INSERT INTO user_api_keys (user_api_key) VALUES (?)', [publicKey])
    if (Array.isArray(query) && query.length === 0) throw new APIError('Error al almacenar la llave pública')
    return res.status(HttpStatusCode.OK).json({ key: publicKey })
  } catch (error: any) {
    return httpErrorCatch(res, error)
  }
}

export const checkDone = (_req: Request, res: Response): Response => {
  return res.status(HttpStatusCode.OK).json({ check: true })
}
