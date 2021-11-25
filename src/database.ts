import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    entities: [],
    synchronize: true,
    logging: false
}).then(connection => {
    console.log('Database connection made to ${connection.name}');
    // here you can start to work with your entities
}).catch(error => console.log(error));

export default createConnection;