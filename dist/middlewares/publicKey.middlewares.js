import { pool } from '../config/dbconection.js';
import { APIError } from '../errors/customErrorClasses.js';
import { httpErrorCatch } from '../errors/errorHandler.js';
export const checkPublicKey = async (req, res, next) => {
    const publicKey = req.headers['x-public-key'];
    try {
        if (publicKey === undefined)
            throw new APIError('No has ingresado tu api key');
        if (String(publicKey) !== '' && String(publicKey).length === 0)
            throw new APIError('No has ingresado tu api key');
        await getDBPublicKey(publicKey);
        next();
    }
    catch (error) {
        httpErrorCatch(res, error);
    }
};
const getDBPublicKey = async (payload) => {
    try {
        const [query] = await pool.query('SELECT api_key, true FROM user_api_keys WHERE api_key = ?', [payload]);
        if (Array.isArray(query) && query.length === 0)
            throw new APIError('Error al buscar la api key.');
    }
    catch (error) {
        throw new APIError(error);
    }
};
export const getDBIDKey = async (req, _res, next) => {
    const publicKey = req.headers['x-public-key'];
    try {
        const [query] = await pool.query('SELECT id_user_api_key FROM user_api_keys WHERE api_key = ?', [publicKey]);
        if (Array.isArray(query) && query.length === 0)
            throw new APIError('Error al traer el ID la api key.');
        req.body.IDKey = query[0].id_user_api_key;
        req.query.IDKey = query[0].id_user_api_key;
        next();
    }
    catch (error) {
        throw new APIError(error);
    }
};
