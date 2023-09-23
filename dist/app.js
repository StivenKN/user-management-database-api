import express from 'express';
import cors from 'cors';
import * as routes from './routes/routes.js';
import { HttpStatusCode } from './enums/httpStatusCodes.enums.js';
const app = express();
const options = {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(options));
app.use(express.json());
const appRoutes = Object.values(routes);
const API = '/api';
for (const route of appRoutes) {
    app.use(API, route);
}
app.use((_req, res) => {
    const errorMessage = '¡Oops! Parece que este endpoint fue destruido por fuerzas fuera de nuestro conocimiento.';
    return res.status(HttpStatusCode.NotFound).json({ error: errorMessage });
});
export { app };
