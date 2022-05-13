import { app } from '../index'
import request from 'supertest';
import { should } from 'chai'

should()

const VALID_URL = "https://www.GoOgle.com"

describe('URL Shortener Router', function () {
    let hash = '';

    it('[POST] /shorten-url should create a shortened URL', async function () {
        await request(app)
            .post('/shorten-url')
            .send({ url: VALID_URL })
            .expect(201)
            .then(function (response) {
                response.body.should.have.property('hash');
                response.body.hash.should.be.a('string');
                hash = response.body.hash;
            })
    });

    it('[GET] /go/hashCode should redirect to the shortened link a shortened URL', async function () {
        if (hash.length < 4) {
            this.skip()
        }
        await request(app)
            .get(`/get/${hash}`)
            .expect(200)
            .then(function (response) {
                response.body.url.should.equal(VALID_URL.toLocaleLowerCase());
            })
    });
})

