import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

const user = {
    email: "Albert.Einstein@yahoo.com",
    password: "E=MCsquared"
}

let token: string;

describe('User rights', () => {
    describe('Logged in users vs middlewares', () => {
        it('Users can log in', async () => {
            const response = await request(app)
                .post('/login')
                .send(user);
            expect(response.body).to.have.key('token');
            expect(response.statusCode).to.equal(200);
            token = response.body.token;
        });
    });
});