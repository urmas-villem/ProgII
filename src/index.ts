import usersController from './components/users/controller';
import express, { Request, Response, Application, request } from 'express';
import db_middleware from './components/general/middlewares';
const app: Application = express();
//morgan install = npm install morgan
//import morgan
const morgan = require("morgan");
//morgan('tiny') = :method :url :status :res[content-length] - :response-time ms
app.use(express.json())
const port: number = 3000;

app.get('/schedule/:id', db_middleware.logger, morgan("tiny"), usersController.getUserById);
app.post('/schedule', db_middleware.logger, morgan("tiny"), usersController.addToSchedule);
app.delete('/schedule/:id', db_middleware.logger, morgan("tiny"), usersController.deleteById);
app.patch('/schedule/:id', db_middleware.logger, morgan("tiny"), usersController.editById);
app.get('/wtf', db_middleware.logger, morgan("tiny"), usersController.viewAllSchedule);

app.listen(port, () => {
    console.log('Server is running');
});