import { type NextFunction, type Request, type Response } from 'express'
import { pool } from '../config/dbconection.js'
import { APIError } from '../errors/customErrorClasses.js'
import { httpErrorCatch } from '../errors/errorHandler.js'

export const checkPublicKey = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const publicKey = String(req.headers['x-public-key'])
  try {
    await getDBPublicKey(publicKey)
    next()
  } catch (error) {
    httpErrorCatch(res, error as string)
  }
}

const getDBPublicKey = async (payload: string): Promise<void> => {
  try {
    const [query] = await pool.query('SELECT api_key, true FROM user_api_keys WHERE api_key = ?', [payload])
    if (Array.isArray(query) && query.length === 0) throw new APIError('Error al buscar la api key.')
  } catch (error) {
    throw new APIError('Error al intentar buscar la api key')
  }
}
