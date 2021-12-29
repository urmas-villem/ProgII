import { Request, Response, NextFunction } from "express";
import responseCodes from "../general/responseCodes";
import { currentuser } from "./authenticationService";
import pool from "../../database";

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const [users]:any = await pool.query('SELECT role FROM users WHERE email = ?', [currentuser]);
    const currentUserRole = Object.values(users[0])
    if (currentUserRole[0] !== 'Admin'){
        return res.status(responseCodes.notAuthorized).json({
            error: 'Admin rights required to view information',
        });
    }
    return next();
};

export default isAdmin;