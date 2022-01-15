import usersController from './components/users/controller';
import express, { Application } from 'express';
import db_middleware from './components/general/middlewares';
import authenticationController from './components/authentication/authenticationController';
import isLoggedIn from './components/authentication/isLoggedInMiddleWare';
import isAdmin from './components/authentication/isAdminMiddleware';
import './database';

const app: Application = express();
//morgan install = npm install morgan
//import morgan
const morgan = require("morgan");
//morgan('tiny') = :method :url :status :res[content-length] - :response-time ms
app.use(express.json())

app.post('/login', authenticationController.login); // SQL not needed
app.post('/access', db_middleware.logger, morgan("tiny"), usersController.createUserAccess); // SQL done

app.use(isLoggedIn);
app.get('/courseschedule/:id', db_middleware.logger, morgan("tiny"), usersController.viewCourseSchedulebyid); // SQL done
app.get('/schedule/:id', db_middleware.logger, morgan("tiny"), usersController.getUserScheduleById); // SQL done

app.use(isAdmin);
app.get('/wtfusers', db_middleware.logger, morgan("tiny"), usersController.viewAllUsers); // SQL done
app.delete('/user/:id', db_middleware.logger, morgan("tiny"), usersController.deleteUser); // SQL done

export default app;