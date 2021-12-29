import { db_teachers, db_courses, db_rooms, db_subjects, dbTodaysClasses, db_access_control } from '../../db';
import { createTodaysClasses, findTeachers } from '../../functions'
import { Request, Response } from 'express';
import responseCodes from '../../components/general/responseCodes';
import hashService from '../general/services/hashService';
import pool from '../../database';

const usersController = {
    getUserAccessById: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        if (!id || db_access_control.teachers.length < id) {
            return res.status(responseCodes.notFound).json({ error: 'User is not authenticated' })
        }else 
        //if ((id!== res.locals.user.id) || (res.locals.user.role !== 'Admin')){
        //    return res.status(responseCodes.notAuthorized).json({ 
        //        error: 'You dont have permissions to view this'
        //    });
        //}
        res.status(responseCodes.ok).json({ message: 'User authenticated' });
    },

    createUserAccess: async (req: Request, res: Response) => {
        var { firstName, lastName, email, password, role } = req.body;
        const id = db_access_control.teachers.length + 1;
        var password: any = await hashService.hash(password);
        if (!firstName || !lastName || !email || !password || !role) {
            return res.status(responseCodes.notFound).json({ error: 'Not all required fields met. Fields needed: firstName, lastName, email, password, role' })
        }else 
        db_access_control.teachers.push({
            id,
            firstName,
            lastName,
            email,
            password,
            role,
        })

        res.status(responseCodes.created).json({ message: 'User access added' })
    },

    getUserScheduleById: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const classes = dbTodaysClasses.find((element: any) => element.id === id)
        if (!id || db_teachers.teachers.length < id) {
            return res.status(responseCodes.notFound).json({ error: 'No valid id provided' })
        }else 
        
        findTeachers()
        createTodaysClasses()
    
        res.status(responseCodes.ok).json({ classes });
    }, 

    addToSchedule: (req: Request, res: Response) => {
        const { firstName, lastName, nameOfSubject, idOfRoom, courseId } = req.body;
        const id = db_teachers.teachers.length + 1;
        if (!firstName || !lastName || !nameOfSubject || !idOfRoom || !courseId) {
            return res.status(responseCodes.notFound).json({ error: 'Not all required fields met. Fields needed: firstName, lastName, nameOfSubject, idOfRoom, courseId' })
        }else 
        db_teachers.teachers.push({
            id,
            firstName,
            lastName,
        })
        db_rooms.room.push({
            idOfRoom,
        })
        db_courses.course.push({
            courseId,
        })
        const teacherOfSubject = 'placeholder'
        db_subjects.subject.push({
            teacherOfSubject,
            nameOfSubject,
        })
    
        res.status(responseCodes.created).json({ message: 'Class added' })
    
        findTeachers()
        createTodaysClasses()
    }, 

    deleteFromScheduleById: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        if (!id || dbTodaysClasses.length < id) {
            return res.status(responseCodes.notFound).json({ error: 'No valid id provided' })
        }else 
        db_teachers.teachers.splice(id - 1, 1)
        db_subjects.subject.splice(id - 1, 1)
        db_rooms.room.splice(id - 1, 1)
        db_courses.course.splice(id - 1, 1)
        dbTodaysClasses.splice(id - 1, 1)
    
        findTeachers()
        createTodaysClasses()

        res.status(responseCodes.ok).json({ message: 'Delete Done' })

    },

    editScheduleById: (req: Request, res: Response) => {
        const { firstName, lastName, nameOfSubject, idOfRoom, courseId } = req.body;
        const id: number = parseInt(req.params.id);
        if (!id || dbTodaysClasses.length < id) {
            return res.status(responseCodes.notFound).json({ error: 'No valid id provided' })
        }else
        db_teachers.teachers[id-1].firstName = firstName
        db_teachers.teachers[id-1].lastName = lastName
        db_rooms.room[id-1].idOfRoom = idOfRoom
        db_courses.course[id-1].courseId = courseId
        db_subjects.subject[id-1].nameOfSubject = nameOfSubject
    
        findTeachers()
        createTodaysClasses()
    }, 

    viewAllSchedule: (req: Request, res: Response) => {
        res.status(responseCodes.ok).json({ dbTodaysClasses })
        findTeachers()
        createTodaysClasses()
    }, 

    viewAllUsers: async (req: Request, res: Response) => {
        const users = await pool.query('SELECT * FROM users');
        res.status(responseCodes.ok).json({ users })
    }
};

export default usersController;