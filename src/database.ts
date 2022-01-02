import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'insert when needed',
    database: 'classes',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  }).promise();

export default pool;