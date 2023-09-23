import { type NextFunction, type Request, type Response } from 'express';
export declare const checkUserData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const checkLoginData: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const getUserPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const comparePassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const cryptUserPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const checkDBNameSpace: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=user.middleware.d.ts.map