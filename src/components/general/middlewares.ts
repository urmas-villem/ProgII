import { Request, Response, NextFunction } from 'express';

const db_middleware = {
    logger: (req: Request, res: Response, next: NextFunction) => {
        const date = new Date(Date.now());
        console.log(`${new Intl.DateTimeFormat('et', { dateStyle: 'medium', timeStyle: 'short' }).format(date)}`);
        next();
    }
}

export default db_middleware;