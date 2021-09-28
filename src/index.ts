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
            id: 1,
            teacherOfSubject: db_teachers.teachers[0].firstName + " " + db_teachers.teachers[0].lastName,
            nameOfSubject: 'Math',
        },
        {
            id: 2,
            teacherOfSubject: db_teachers.teachers[1].firstName + " " + db_teachers.teachers[1].lastName,
            nameOfSubject: 'Chemistry',
        }
    ]
};

const db_rooms = {
    room:[
        {
            id: 206,
        },
        {
            id: 205,
        }
    ]
};

const db_courses = {
    course:[ 
        {
            id: 'RIF2',
        },
        {
            id: 'RIF3'
        }
    ]
};

const dbTodaysClasses = {
    todaysClasses:[
        {
            id: 1,
            course: db_courses.course[0].id,
            subject: db_subjects.subject[0].nameOfSubject,
            teacher: db_subjects.subject[0].teacherOfSubject,
            room: db_rooms.room[0].id
        },
        {
            id: 2,
            course: db_courses.course[1].id,
            subject: db_subjects.subject[1].nameOfSubject,
            teacher: db_subjects.subject[1].teacherOfSubject,
            room: db_rooms.room[1].id
        }
    ]
};

app.get('/course/:id', (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id);
    const classes = dbTodaysClasses.todaysClasses.find((element) => element.id === id)
    res.status(ok).json({
        classes,
    });
});

app.listen(port, () => {
    console.log('Server is running');
});