import { Router } from 'express'
import { checkPublicKey, getDBIDKey } from '../middlewares/publicKey.middlewares.js'
import { checkDBNameSpace, checkUserData, cryptUserPassword } from '../middlewares/user.middleware.js'
import { createUserByEmail, getDBUsers } from '../controllers/user.controllers.js'

const userRoute = Router()

userRoute.get('/show-db-users', checkPublicKey, getDBIDKey, checkDBNameSpace, getDBUsers)

userRoute.post('/register-user-email', checkPublicKey, checkUserData, cryptUserPassword, getDBIDKey, createUserByEmail)

export { userRoute }
