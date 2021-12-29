import { db_teachers, db_courses, db_rooms, db_subjects, dbTodaysClasses, db_access_control } from './db';
import pool from './database';

export function createTodaysClasses(){
    for (var i = 0; i < db_teachers.teachers.length; i++) {
        dbTodaysClasses[i] = {
            id: i + 1,
            course: db_courses.course[i].courseId,
            subject: db_subjects.subject[i].nameOfSubject,
            teacher: db_subjects.subject[i].teacherOfSubject,
            room: db_rooms.room[i].idOfRoom
        }
        if (db_subjects.subject[i].teacherOfSubject === 'placeholder'){
            db_subjects.subject[i].teacherOfSubject = db_teachers.teachers[i].firstName + " " + db_teachers.teachers[i].lastName
        }
    }
};

export function findTeachers(){
    for (var i = 0; i < db_subjects.subject.length; i++) {
        db_subjects.subject[i].teacherOfSubject = db_teachers.teachers[i].firstName + " " + db_teachers.teachers[i].lastName
    }
};

export async function emailCheck(email: string) {
    const [users]:any = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
    if (users[0] == undefined) {
        return 'Email is invalid'
    }else 
    return email
};