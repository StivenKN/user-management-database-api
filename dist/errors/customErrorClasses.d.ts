import { HttpStatusCode } from '../enums/httpStatusCodes.enums.js';
export declare class CustomError extends Error {
    statusCode: number;
    header: string;
    constructor(message: string, statusCode?: HttpStatusCode);
}
export declare class APIError extends CustomError {
    constructor(message: string);
}
//# sourceMappingURL=customErrorClasses.d.ts.map