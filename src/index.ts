import usersController from './components/users/controller';
import express, { Request, Response, Application, request } from 'express';
import db_middleware from './components/general/middlewares';
import authenticationController from './components/authentication/authenticationController';
import isLoggedIn from './components/authentication/isLoggedInMiddleWare';
import isAdmin from './components/authentication/isAdminMiddleware';

const app: Application = express();
//morgan install = npm install morgan
//import morgan
const morgan = require("morgan");
//morgan('tiny') = :method :url :status :res[content-length] - :response-time ms
app.use(express.json())
const port: number = 3000;

app.post('/login', authenticationController.login);
app.post('/access', db_middleware.logger, morgan("tiny"), usersController.createUserAccess);

app.use(isLoggedIn);
app.get('/wtf', db_middleware.logger, morgan("tiny"), usersController.viewAllSchedule);
app.get('/schedule/:id', db_middleware.logger, morgan("tiny"), usersController.getUserScheduleById);

app.use(isAdmin);
app.get('/access/:id', db_middleware.logger, morgan("tiny"), usersController.getUserAccessById);
app.post('/schedule', db_middleware.logger, morgan("tiny"), usersController.addToSchedule);
app.delete('/schedule/:id', db_middleware.logger, morgan("tiny"), usersController.deleteFromScheduleById);
app.patch('/schedule/:id', db_middleware.logger, morgan("tiny"), usersController.editScheduleById);
app.get('/wtfusers', db_middleware.logger, morgan("tiny"), usersController.viewAllUsers);


app.listen(port, () => {
    console.log('Server is running');
});