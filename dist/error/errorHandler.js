import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js';
export const httpErrorCatch = (res, error) => {
    return res.status(HttpStatusCode.InternalServerError).json({ error });
};
