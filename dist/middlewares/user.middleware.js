import { httpErrorCatch } from '../errors/errorHandler.js';
import { loginSchema, userSchema } from '../schemas/user.schemas.js';
import { APIError } from '../errors/customErrorClasses.js';
import bcrypt from 'bcrypt';
import joi from 'joi';
import { pool } from '../config/dbconection.js';
export const checkUserData = async (req, res, next) => {
    const { userEmail, userPassword, userRole, dbNameSpace } = req.body;
    try {
        const { error } = await userSchema.validateAsync({ userEmail, userPassword, userRole, dbNameSpace });
        if (error !== undefined)
            throw new APIError('Los datos ingresados no son válidos, verifíquelos.');
        next();
    }
    catch (error) {
        httpErrorCatch(res, error);
    }
};
export const checkLoginData = async (req, res, next) => {
    const { userEmail, userPassword } = req.body;
    try {
        const { error } = await loginSchema.validateAsync({ userEmail, userPassword });
        if (error !== undefined)
            throw new APIError('Datos erróneos, inténtalo de nuevo');
        next();
    }
    catch (error) {
        httpErrorCatch(res, error);
    }
};
export const getUserPassword = async (req, res, next) => {
    const { userEmail } = req.body;
    try {
        const [query] = await pool.query('SELECT user_password from users where user_email = ?', [userEmail]);
        if (Array.isArray(query) && query.length === 0)
            throw new APIError('User not exist');
        const DBuserPassword = query[0].user_password;
        req.body.DBPayload = DBuserPassword;
        next();
    }
    catch (error) {
        httpErrorCatch(res, error);
    }
};
export const comparePassword = async (req, res, next) => {
    const { userPassword, DBPayload } = req.body;
    try {
        bcrypt.compare(userPassword, DBPayload)
            .then(() => {
            next();
        })
            .catch((err) => {
            throw new APIError(err);
        });
    }
    catch (error) {
        httpErrorCatch(res, error);
    }
};
export const cryptUserPassword = async (req, res, next) => {
    const { userPassword } = req.body;
    try {
        const saltRounds = 10;
        const genSalt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userPassword, genSalt);
        req.body.userPassword = hash;
        next();
    }
    catch (error) {
        httpErrorCatch(res, error);
    }
};
export const checkDBNameSpace = async (req, res, next) => {
    const { dbNameSpace } = req.query;
    try {
        const { error } = await joi.object({ dbNameSpace: joi.string().required() }).validateAsync({ dbNameSpace });
        if (error !== undefined)
            throw new APIError('DB name space not valid');
        next();
    }
    catch (error) {
        httpErrorCatch(res, error);
    }
};
