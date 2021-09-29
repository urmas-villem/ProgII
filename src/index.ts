import express, { Request, Response, Application } from 'express';
const app: Application = express();
app.use(express.json());

const port: number = 3000;
const ok: number = 200;
const created: number = 201;

const db_teachers = {
    teachers:[
        {
            id: 1,
            firstName: 'Albert',
            lastName: 'Einstein',
        },
        {
            id: 2,
            firstName: 'Marie',
            lastName: 'Curie',
        }    
    ]
};

const db_subjects = {
    subject: [
        {
            teacherOfSubject: db_teachers.teachers[0].firstName + " " + db_teachers.teachers[0].lastName,
            nameOfSubject: 'Math',
        },
        {
            teacherOfSubject: db_teachers.teachers[1].firstName + " " + db_teachers.teachers[1].lastName,
            nameOfSubject: 'Chemistry',
        }
    ]
};

const db_rooms = {
    room:[
        {
            idOfRoom: 201,
        },
        {
            idOfRoom: 202,
        },
        {
            idOfRoom: 203,
        }
    ]
};

const db_courses = {
    course:[ 
        {
            courseId: 'RIF2',
        },
        {
            courseId: 'RIF3'
        }
    ]
};

const dbTodaysClasses: any = [];

function createTodaysClasses(){
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

/** 
 * Post - Create
 * Get - Read
 * Put - Update
 * Delete - Delete
*/

app.get('/schedule/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const classes = dbTodaysClasses.find((element: any) => element.id === id)

    createTodaysClasses()
    
    res.status(ok).json({
        classes,
    });
});

app.post('/schedule', (req: Request, res: Response) => {
    const { firstName, lastName, nameOfSubject, idOfRoom, courseId } = req.body;
    const id = db_teachers.teachers.length + 1;
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

    createTodaysClasses()

    res.status(ok).json({
       message: 'Class added',
    })
});

app.delete('/schedule/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    db_teachers.teachers.splice(id - 1, 1)
    db_subjects.subject.splice(id - 1, 1)
    db_rooms.room.splice(id - 1, 1)
    db_courses.course.splice(id - 1, 1)
    dbTodaysClasses.splice(id - 1, 1)

    /** 
    console.log(db_teachers.teachers)
    console.log(db_subjects.subject)
    console.log(db_rooms.room)
    console.log(db_courses.course)
    console.log(dbTodaysClasses)
    */

    res.status(ok).json({
        message: 'Delete done',
     })
});

app.get('/wtf', (req: Request, res: Response) => {
    res.status(ok).json({
        dbTodaysClasses
    });
});

app.listen(port, () => {
    console.log('Server is running');
});