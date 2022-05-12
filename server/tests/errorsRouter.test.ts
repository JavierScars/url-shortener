import { app } from '../index'
import request from 'supertest';
import { should } from 'chai'

should()

describe('Using bad routes', function () {
    it('GET /non-existing-url should respond 404 not found', async function () {
        await request(app)
            .get('/non-existing-url')
            .expect(404)
            .then(function (response) {
                response.text.toUpperCase().should.include('NOT FOUND');
            })
    });
})

