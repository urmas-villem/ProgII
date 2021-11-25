import "reflect-metadata";
import { createConnection } from "typeorm";
import User from './components/users/entity'

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "my-secret-pw",
    database: "some-mysql",
    entities: [User],
    synchronize: true,
    logging: true
}).then(connection => {
    console.log('Database connection made to ${connection.name}');
    // here you can start to work with your entities
}).catch(error => console.log(error));

export default createConnection;