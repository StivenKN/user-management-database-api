import { type Request, type Response } from 'express'
import { httpErrorCatch } from '../errors/errorHandler.js'
import NodeRSA from 'node-rsa'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'
import { pool } from '../config/dbconection.js'
import { APIError } from '../errors/customErrorClasses.js'

export const createPublicKey = async (_: Request, res: Response): Promise<Response> => {
  try {
    const key = new NodeRSA({ b: 128 })
    key.generateKeyPair()
    const publicKey = key.exportKey('public').replace('-----BEGIN PUBLIC KEY-----\n', '').replace('\n-----END PUBLIC KEY-----', '').replaceAll('\n', '')
    await saveKeyToDatabase(publicKey)
    return res.status(HttpStatusCode.OK).json({ key: publicKey })
  } catch (error: any) {
    console.error(error)
    return httpErrorCatch(res, error)
  }
}

const saveKeyToDatabase = async (publicKey: string): Promise<string | boolean> => {
  try {
    const [query] = await pool.query('INSERT INTO user_api_keys (api_key) VALUES (?)', [publicKey])
    if (Array.isArray(query) && query.length === 0) throw new APIError('Error al almacenar la llave pública')
    return true
  } catch (error) {
    throw new APIError('Error al almacenar los datos')
  }
}

export const checkDone = (_req: Request, res: Response): Response => {
  return res.status(HttpStatusCode.OK).json({ check: true })
}
