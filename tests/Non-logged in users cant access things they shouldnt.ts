import request from 'supertest';
import { describe, it } from 'mocha';
import { expect } from 'chai';
import app from '../src/app';

describe('User rights', () => {
    describe('Non-logged in users vs middlewares', () => {
        it('Non logged in users cant view users', async () => {
            const response = await request(app).get('/wtfusers');
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
            expect(response.statusCode).to.equal(401);
        });

        it('Non logged in users cant view classes', async () => {
            const response = await request(app).get('/wtf');
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
            expect(response.statusCode).to.equal(401);
        });

        it('Non logged in users cant view schedule by ID', async () => {
            const response = await request(app).get('/shchedule/:id');
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
            expect(response.statusCode).to.equal(401);
        });

        it('Non logged in users cant view access rights', async () => {
            const response = await request(app).get('/access/:id');
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
            expect(response.statusCode).to.equal(401);
        });

        it('Non logged in users cant view schedule', async () => {
            const response = await request(app).get('/schedule');
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
            expect(response.statusCode).to.equal(401);
        });

        it('Non logged in users cant view users by ID', async () => {
            const response = await request(app).get('/user/:id');
            expect(response.body).to.have.key('error');
            expect(response.body.error).to.equal('No token provided');
            expect(response.statusCode).to.equal(401);
        });
    });
});