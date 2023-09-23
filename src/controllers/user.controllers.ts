import { type Request, type Response } from 'express'
import { type user } from '../interfaces/user.interface.js'
import { httpErrorCatch } from '../errors/errorHandler.js'
import { pool } from '../config/dbconection.js'
import { APIError } from '../errors/customErrorClasses.js'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'

export const createUserByEmail = async (req: Request, res: Response): Promise<Response> => {
  const { userEmail, dbNameSpace, userPassword, userRole, IDKey } = req.body as user
  try {
    const [query] = await pool.query('INSERT INTO users (id_user_api_key, user_email, user_password, id_user_role_fk, db_namespace) VALUES (?, ?, ?, ?, ?)', [IDKey, userEmail, userPassword, userRole, dbNameSpace])
    if (Array.isArray(query) && query.length === 0) throw new APIError('Ha ocurrido un error al ingresar los datos')
    return res.status(HttpStatusCode.OK).json({ msg: 'User created!' })
  } catch (error: any) {
    return httpErrorCatch(res, error)
  }
}
