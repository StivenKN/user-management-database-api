import { type Response, Router, type Request } from 'express'
import { pool } from '../config/dbconection.js'
import { keyRoute } from './publicKey.routes.js'
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js'

const routes = Router()

routes.get('/ping', (_, res: Response) => res.send('pong'))

routes.get('/test', async (_req: Request, res: Response): Promise<void> => {
  try {
    const [testPool] = await pool.query('SELECT 1+1')
    res.status(HttpStatusCode.OK).json({ msg: testPool, status: 200, db: process.env.DB_DATABASE })
  } catch (error) {
    res.status(HttpStatusCode.InternalServerError).json({ msg: 'Error en la consulta a la base de datos' })
  }
})

export { routes, keyRoute }
