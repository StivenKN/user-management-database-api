import { type Request, type Response } from 'express'
import { httpErrorCatch } from '../errors/errorHandler.js'
import NodeRSA from 'node-rsa'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'
import { pool } from '../config/dbconection.js'
import { APIError } from '../errors/customErrorClasses.js'
import bcrypt from 'bcrypt'

export const createPublicKey = async (_: Request, res: Response): Promise<Response> => {
  try {
    const key = new NodeRSA({ b: 1024 })
    const publicKey = key.exportKey('public').replace('-----BEGIN PUBLIC KEY-----\n', '').replace('\n-----END PUBLIC KEY-----', '')
    const hash = await hashPublicKey(publicKey)
    await saveKeyToDatabase(hash)
    return res.status(HttpStatusCode.OK).json({ key: publicKey })
  } catch (error) {
    console.error(error)
    return httpErrorCatch(res, error as string ?? 'Error al crear la llave publica')
  }
}

const hashPublicKey = async (publickey: string): Promise<string> => {
  const saltRounds = 10
  try {
    const genSalt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(publickey, genSalt)
    return hash
  } catch (error) {
    throw new APIError('Error al crear el hash')
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
