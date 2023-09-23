import { Router } from 'express'
import { checkPublicKey, getDBIDKey } from '../middlewares/publicKey.middlewares.js'
import { checkUserData, cryptUserPassword } from '../middlewares/user.middleware.js'
import { createUserByEmail } from '../controllers/user.controllers.js'

const userRoute = Router()

userRoute.post('/register-user-email', checkPublicKey, checkUserData, cryptUserPassword, getDBIDKey, createUserByEmail)

export { userRoute }
