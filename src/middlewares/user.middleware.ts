import { type NextFunction, type Request, type Response } from 'express'
import { httpErrorCatch } from '../errors/errorHandler.js'
import { loginSchema, userSchema } from '../schemas/user.schemas.js'
import { APIError } from '../errors/customErrorClasses.js'
import { type user } from '../interfaces/user.interface.js'
import bcrypt from 'bcrypt'
import joi from 'joi'
import { pool } from '../config/dbconection.js'
import { type RowDataPacket } from 'mysql2'

export const checkUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userName, userEmail, userPassword, userRole, dbNameSpace } = req.body as user
  try {
    const { error } = await userSchema.validateAsync({ userName, userEmail, userPassword, userRole, dbNameSpace })
    if (error !== undefined) throw new APIError('Los datos ingresados no son válidos, verifíquelos.')
    next()
  } catch (error: any) {
    httpErrorCatch(res, error)
  }
}

export const checkLoginData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userEmail, userPassword } = req.body as user
  try {
    const { error } = await loginSchema.validateAsync({ userEmail, userPassword })
    if (error !== undefined) throw new APIError('Datos erróneos, inténtalo de nuevo')
    next()
  } catch (error: any) {
    httpErrorCatch(res, error)
  }
}

export const getUserPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userEmail } = req.body as user
  try {
    const [query] = await pool.query<RowDataPacket[]>('SELECT user_password, user_full_name from users where user_email = ?', [userEmail])
    if (Array.isArray(query) && query.length === 0) throw new APIError('User not exist')
    const DBuserPassword = query[0].user_password
    const userName = query[0].user_full_name
    req.body.DBPayload = DBuserPassword
    req.body.userName = userName
    next()
  } catch (error: any) {
    httpErrorCatch(res, error)
  }
}

export const comparePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userPassword, DBPayload } = req.body as user
  try {
    bcrypt.compare(userPassword, DBPayload)
      .then(() => {
        next()
      })
      .catch((err: any) => {
        throw new APIError(err)
      })
  } catch (error: any) {
    httpErrorCatch(res, error)
  }
}

export const cryptUserPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userPassword } = req.body as user
  try {
    const saltRounds = 10
    const genSalt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(userPassword, genSalt)
    req.body.userPassword = hash
    next()
  } catch (error: any) {
    httpErrorCatch(res, error)
  }
}

export const checkDBNameSpace = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { dbNameSpace } = req.query
  try {
    const { error } = await joi.object({ dbNameSpace: joi.string().required() }).validateAsync({ dbNameSpace })
    if (error !== undefined) throw new APIError('DB name space not valid')
    next()
  } catch (error: any) {
    httpErrorCatch(res, error)
  }
}
