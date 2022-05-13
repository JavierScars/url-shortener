import { app } from '../index'
import request from 'supertest';
import { should, expect } from 'chai'
import { randomBytes } from 'crypto';
import { removeUser } from '../services/users'

should()

const userName = randomBytes(10).toString('base64')
const password = randomBytes(10).toString('base64')

describe('Auth Router', function () {
    this.afterAll(async function () {
        await removeUser(userName)
    })

    it('[POST] /signup should create a user', async function () {
        await request(app)
            .post('/signup')
            .send({ username: userName, password: password })
            .expect(201)
            .then(function (response) {
                response.body.should.have.property('username');
                response.body.username.should.be.a('string');
            })
    });

    it('[GET] /signin', async function () {
        await request(app)
            .post('/signin')
            .send({ username: userName, password: password })
            .expect(302)
            .then(function (response) {
                expect(response.headers).to.have.property('location');
                expect(response.headers.location).to.equal('/user');
            })
    });
})

