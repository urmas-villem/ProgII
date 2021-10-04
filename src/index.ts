import usersController from './components/users/controller';
import express, { Request, Response, Application, request } from 'express';
const app: Application = express();
app.use(express.json());
const port: number = 3000;
export const ok: number = 200;
export const badRequest: number = 400;

app.get('/schedule/:id', usersController.getUserById);
app.post('/schedule', usersController.addToSchedule);
app.delete('/schedule/:id', usersController.deleteById);
app.patch('/schedule/:id', usersController.editById);
app.get('/wtf', usersController.viewAllSchedule);

app.listen(port, () => {
    console.log('Server is running');
});