import { Router } from 'express'
import { checkPublicKey, getDBIDKey } from '../middlewares/publicKey.middlewares.js'
import { checkDBNameSpace, checkLoginData, checkUserData, comparePassword, cryptUserPassword, getUserPassword } from '../middlewares/user.middleware.js'
import { createUserByEmail, generateToken, getDBUsers } from '../controllers/user.controllers.js'

const userRoute = Router()

userRoute.get('/users', checkPublicKey, getDBIDKey, checkDBNameSpace, getDBUsers)

userRoute.post('/users/register', checkPublicKey, checkUserData, cryptUserPassword, getDBIDKey, createUserByEmail)
userRoute.post('/users/login', checkPublicKey, checkLoginData, getUserPassword, comparePassword, generateToken)

export { userRoute }
