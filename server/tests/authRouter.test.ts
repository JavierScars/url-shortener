import { app } from '../index'
import request from 'supertest';
import { should, expect } from 'chai'
import { randomBytes } from 'crypto';
import { removeUser } from '../services/users'

should()

const userName = randomBytes(10).toString('base64')
const password = randomBytes(10).toString('base64')

describe('Auth Router', function () {
    let session: string = '';

    this.afterAll(async function () {
        await removeUser(userName)
    })

    it('[POST] /signup should create a user', async function () {
        await request(app)
            .post('/signup')
            .send({ username: userName, password: password })

    });

    it('[GET] /signin should sign in the user and redirect to /get-user', async function () {
        await request(app)
            .post('/signin')
            .send({ username: userName, password: password })
            .expect(302)
            .expect('Location', '/get-user')
    });

    it('[GET] /get-user should return the user data', async function () {
        await request(app)
            .post('/signin')
            .send({ username: userName, password: password })
            .expect(302)
            .expect('Location', '/get-user')
            .then(res => {
                session = res
                    .headers['set-cookie'][0]
                    .split(',')
                    .map((item: string) => item.split(';')[0])
                    .join(';')
            });

        await request(app)
            .get('/get-user')
            .set('cookie', session)
            .expect(200)
    });
})

