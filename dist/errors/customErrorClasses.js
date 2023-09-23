import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js';
export class CustomError extends Error {
    statusCode;
    header;
    constructor(message, statusCode = HttpStatusCode.InternalServerError) {
        super(message);
        this.header = 'Custom_error';
        this.statusCode = statusCode;
    }
}
export class APIError extends CustomError {
    constructor(message) {
        super(message);
        this.header = 'API_ERROR';
        this.statusCode = HttpStatusCode.InternalServerError;
    }
}
