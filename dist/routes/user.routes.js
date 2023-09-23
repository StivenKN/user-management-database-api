import { Router } from 'express';
import { checkPublicKey, getDBIDKey } from '../middlewares/publicKey.middlewares.js';
import { checkDBNameSpace, checkLoginData, checkUserData, comparePassword, cryptUserPassword, getUserPassword } from '../middlewares/user.middleware.js';
import { createUserByEmail, generateToken, getDBUsers } from '../controllers/user.controllers.js';
const userRoute = Router();
userRoute.get('/show-db-users', checkPublicKey, getDBIDKey, checkDBNameSpace, getDBUsers);
userRoute.post('/register-user/email', checkPublicKey, checkUserData, cryptUserPassword, getDBIDKey, createUserByEmail);
userRoute.post('/login-user/email', checkPublicKey, checkLoginData, getUserPassword, comparePassword, generateToken);
export { userRoute };
