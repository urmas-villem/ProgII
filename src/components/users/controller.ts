import { db_teachers, db_courses, db_rooms, db_subjects, dbTodaysClasses } from '../../db';
import { createTodaysClasses, findTeachers } from '../../functions'
import { Request, Response } from 'express';
import { ok } from '../../index';
import { badRequest } from '../../index';


const usersController = {
    getUserById: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const classes = dbTodaysClasses.find((element: any) => element.id === id)
        if (!id || db_teachers.teachers.length < id) {
            return res.status(badRequest).json({ error: 'No valid id provided' })
        }else 
        
        findTeachers()
        createTodaysClasses()
    
        res.status(ok).json({ classes });
    }, 

    addToSchedule: (req: Request, res: Response) => {
        const { firstName, lastName, nameOfSubject, idOfRoom, courseId } = req.body;
        const id = db_teachers.teachers.length + 1;
        if (!firstName || !lastName || !nameOfSubject || !idOfRoom || !courseId) {
            return res.status(badRequest).json({ error: 'Not all required fields met. Fields needed: firstName, lastName, nameOfSubject, idOfRoom, courseId' })
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
    
        res.status(ok).json({ message: 'Class added' })
    
        findTeachers()
        createTodaysClasses()
    }, 

    deleteById: (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        if (!id || dbTodaysClasses.length < id) {
            return res.status(badRequest).json({ error: 'No valid id provided' })
        }else 
        db_teachers.teachers.splice(id - 1, 1)
        db_subjects.subject.splice(id - 1, 1)
        db_rooms.room.splice(id - 1, 1)
        db_courses.course.splice(id - 1, 1)
        dbTodaysClasses.splice(id - 1, 1)
    
        findTeachers()
        createTodaysClasses()

        res.status(ok).json({ message: 'Delete Done' })

    },

    editById: (req: Request, res: Response) => {
        const { firstName, lastName, nameOfSubject, idOfRoom, courseId } = req.body;
        const id: number = parseInt(req.params.id); 
        if (!id || dbTodaysClasses.length < id) {
            return res.status(badRequest).json({ error: 'No valid id provided' })
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
        res.status(ok).json({ dbTodaysClasses })
    }
};

export default usersController;