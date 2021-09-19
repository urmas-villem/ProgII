import express, { Request, Response, Application } from 'express';
const app: Application = express();
app.use(express.json());

const port: number = 3000;
const ok: number = 200;
const created: number = 201;

const db_teachers = {
    teacher:[
        {
        id: 1,
        firstName: 'Albert',
        lastName: 'Einstein',
        }
    ]
};

const db_subjects = {
    subject: [
        {
        id: 1,
        teacherId: db_teachers.teacher.id,
        nameOfSubject: 'Math',
        }
    ]
};

const db_rooms = {
    room:[
        {
        id: 206,
        }
    ]
};

const db_courses = {
    course:[ 
        {
        id: 'RIF2',
        }
    ]
};

const dbTodaysClasses = {
    todaysClasses:[
        {
        teacher: db_teachers.teacher.firstName + " " + db_teachers.teacher.lastName,
        subject: db_subjects.subject.nameOfSubject,
        room: db_rooms.room.id,
        course: db_courses.course.id,
        }
    ]
}

app.get('/course/:id', (req: Request, res: Response) => {
    const classes = dbTodaysClasses.todaysClasses
    res.status(ok).json({
        classes,
    });
});

app.post('/users', (req: Request, res: Response) => {
    const { firstName, lastName } = req.body;
    const id = db_teachers.teacher.length + 1;
    db_teachers.teacher.push({
        id,
        firstName, 
        lastName,
    });
});

app.listen(port, () => {
    console.log('Server is running');
});