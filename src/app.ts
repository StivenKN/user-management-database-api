import express, { type Request, type Application, type Response, type IRouter } from 'express'
import cors, { type CorsOptions } from 'cors'
import * as routes from './routes/routes.js'
import { HttpStatusCode } from './enums/httpStatusCodes.enums.js'

const app: Application = express()

const options: CorsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-public-key']
}

app.use(cors(options))

app.use(express.json())

const appRoutes: IRouter[] = Object.values(routes)

const API = '/api'

for (const route of appRoutes) {
  app.use(API, route)
}

app.use((_req: Request, res: Response<object>): Response<object> => {
  const errorMessage = '¡Oops! Parece que este endpoint fue destruido por fuerzas fuera de nuestro conocimiento.'
  return res.status(HttpStatusCode.NotFound).json({ error: errorMessage })
})

export { app }
