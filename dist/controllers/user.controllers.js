import { httpErrorCatch } from '../errors/errorHandler.js';
import { pool } from '../config/dbconection.js';
import { APIError } from '../errors/customErrorClasses.js';
import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js';
import jwt from 'jsonwebtoken';
export const createUserByEmail = async (req, res) => {
    const { userEmail, dbNameSpace, userPassword, userRole, IDKey } = req.body;
    try {
        const [query] = await pool.query('INSERT INTO users (id_user_api_key, user_email, user_password, id_user_role_fk, db_namespace) VALUES (?, ?, ?, ?, ?)', [IDKey, userEmail, userPassword, userRole, dbNameSpace]);
        if (Array.isArray(query) && query.length === 0)
            throw new APIError('Ha ocurrido un error al ingresar los datos');
        return res.status(HttpStatusCode.OK).json({ msg: 'User created!' });
    }
    catch (error) {
        return httpErrorCatch(res, error);
    }
};
export const getDBUsers = async (req, res) => {
    const { IDKey, dbNameSpace } = req.query;
    try {
        const [query] = await pool.query('SELECT users.user_email, users.user_password, users.db_namespace, roles.role_name,    COUNT(*) AS total_users FROM users INNER JOIN roles ON users.id_user_role_fk = roles.id_role WHERE users.db_namespace = ? AND id_user_api_key = ? GROUP BY users.user_email, users.user_password, users.db_namespace, roles.role_name', [dbNameSpace, IDKey]);
        if (Array.isArray(query) && query.length === 0)
            throw new APIError('Error al buscar los usuarios');
        return res.status(HttpStatusCode.OK).json(query);
    }
    catch (error) {
        return httpErrorCatch(res, error);
    }
};
export const generateToken = async (req, res) => {
    const { userEmail, DBPayload } = req.body;
    const { expirationTime } = req.query;
    try {
        const expiresInTime = String(expirationTime);
        const secretKey = process.env.PRIVATE_KEY ?? 'foo';
        const token = jwt.sign({ payload: { userEmail, DBPayload } }, secretKey, { algorithm: 'HS256', expiresIn: expiresInTime });
        if (token === undefined)
            throw new APIError('Error al crear el token');
        return res.status(HttpStatusCode.OK).json(token);
    }
    catch (error) {
        return httpErrorCatch(res, error);
    }
};
