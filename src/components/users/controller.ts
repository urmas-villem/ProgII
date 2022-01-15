import { Request, Response } from 'express';
import responseCodes from '../../components/general/responseCodes';
import hashService from '../general/services/hashService';
import pool from '../../database';

const usersController = {

    createUserAccess: async (req: Request, res: Response) => {
        try{
            var { firstName, lastName, email, password, role } = req.body;
            var password: any = await hashService.hash(password);
            if (!firstName || !lastName || !email || !password || !role) {
                return res.status(responseCodes.notFound).json({ error: 'Not all required fields met. Fields needed: firstName, lastName, email, password, role' })
            }else 
            var user = {
                firstName,
                lastName,
                email,
                password,
                role 
            }
            const [result]:any = await pool.query('INSERT INTO users SET ?', [user])

            res.status(responseCodes.created).json({ message: 'User access added' })
            }catch(error){
            return res.status(responseCodes.badRequest).json({ message: 'Error adding user, re-check inserted fields' })
            }
    },

    getUserScheduleById: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        if (!id) {
            return res.status(responseCodes.notFound).json({ error: 'No valid id provided' })
        }else
        var [result] = await pool.query("SELECT * FROM (SELECT u.firstName, u.lastName FROM users as u where u.id = ?) as a JOIN (SELECT s.nameOfSubject FROM subjects as s order by rand() limit 1) as b JOIN (SELECT c.courseId, r.roomNumber FROM courses AS c INNER JOIN room AS r ON c.id = r.id order by rand() limit 1) as c", id)
        res.status(responseCodes.ok).json({ result })
    },

    deleteUser: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const result = await pool.query('UPDATE users SET dateDeleted = ? WHERE id = ?', [new Date(), id])
        res.status(responseCodes.ok).json({ message: 'Delete Done' })
    },

    viewCourseSchedulebyid: async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        var idLimit = 4;
        if (!id || id > idLimit) {
            return res.status(responseCodes.notFound).json({ error: 'No valid id provided' })
        }else 
        var [result] = await pool.query('SELECT * FROM (SELECT c.courseId, r.roomNumber FROM courses AS c INNER JOIN room AS r ON c.id = r.id  where c.id = ?) as a JOIN (SELECT s.nameOfSubject FROM subjects as s where s.userId = 1 order by rand() limit 1) as b JOIN (SELECT u.firstName, u.lastName FROM users as u INNER JOIN subjects as s WHERE s.userID = u.id order by rand() limit 1) as c;', id)
        res.status(responseCodes.ok).json({ result })
    },


    viewAllUsers: async (req: Request, res: Response) => {
        const [users] = await pool.query('SELECT id, firstName, lastName, email, dateCreated FROM users WHERE dateDeleted IS NULL');
        res.status(responseCodes.ok).json({ users })
    }
};

export default usersController;