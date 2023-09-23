import { Router } from 'express'
import { checkDone, createPublicKey } from '../controllers/publicKey.controllers.js'
import { checkPublicKey } from '../middlewares/publicKey.middlewares.js'

const keyRoute: Router = Router()

keyRoute.get('/check-public-key', checkPublicKey, checkDone)

keyRoute.post('/create-public-key', createPublicKey)

export { keyRoute }
