import { Router } from 'express'
import { checkDone, saveKeyToDatabase } from '../controllers/publicKey.controllers.js'
import { checkPublicKey, createPublicKey } from '../middlewares/publicKey.middlewares.js'

const keyRoute: Router = Router()

keyRoute.get('/public-key', checkPublicKey, checkDone)

keyRoute.post('/public-key', createPublicKey, saveKeyToDatabase)

export { keyRoute }
