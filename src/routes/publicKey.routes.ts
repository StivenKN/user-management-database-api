import { Router } from 'express'
import { createPublicKey } from '../controllers/publicKey.controllers.js'

const keyRoute: Router = Router()

keyRoute.post('/create-public-key', createPublicKey)

export { keyRoute }
