import { type NextFunction, type Request, type Response } from 'express'
import { httpErrorCatch } from '../errors/errorHandler.js'
import { userSchema } from '../schemas/user.schemas.js'
import { APIError } from '../errors/customErrorClasses.js'
import { type user } from '../interfaces/user.interface.js'
import bcrypt from 'bcrypt'
import joi from 'joi'

export const checkUserData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userEmail, userPassword, userRole, dbNameSpace } = req.body as user
  try {
    const { error } = await userSchema.validateAsync({ userEmail, userPassword, userRole, dbNameSpace })
    if (error !== undefined) throw new APIError('Los datos ingresados no son válidos, verifíquelos.')
    next()
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
    console.error(error)
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
