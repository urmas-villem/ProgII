export const db_access_control = {
    teachers:[
        {
            id: 1,
            firstName: 'Albert',
            lastName: 'Einstein',
            email: 'Albert.Einstein@yahoo.com',
            password: '$2b$10$ZPcO7OYsxCYzc10SBE.Ui.L8YRWJsTp7lb6jBpE9Me/J27Fvy/9su',
            //password: 'E=MCsquared',
            role: 'Admin',
        },
        {
            id: 2,
            firstName: 'Marie',
            lastName: 'Curie',
            email: 'Marie.Curie@dailymail.co.uk',
            password: '$2b$10$WZHhMe7HKtoum.HVwJs46Oed2n46YNMpQ6ucgIAn/rXEr3pjtxDeS',
            //password: 'Radiationisabitch',
            role: 'User',
        }  
    ]
};

export const db_teachers = {
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

export const db_subjects = {
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

export const db_rooms = {
    room:[
        {
            idOfRoom: 201,
        },
        {
            idOfRoom: 202,
        }
    ]
};

export const db_courses = {
    course:[ 
        {
            courseId: 'RIF2',
        },
        {
            courseId: 'RIF3',
        }
    ]
};

export const dbTodaysClasses: any = [];