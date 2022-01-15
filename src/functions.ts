import pool from './database';

export async function emailCheck(email: string) {
    const [users]:any = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
    if (users[0] == undefined) {
        return 'Email is invalid'
    }else 
    return email
};