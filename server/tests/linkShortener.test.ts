import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import { should } from 'chai'
should()

import { LinkShortener, isValidURL } from '../utils/urlShortener'

const VALID_URL = "https://www.GOOGLE.com"
const BASE_URL = process.env.SERVER_BASE_URL

describe("urlShortener utils", function () {
    describe("isValidURL should be able to validate the input url", function () {
        it("Should return true on a valid URL", function () {
            isValidURL(VALID_URL).should.be.true;
        })

        it("Should return false on a invalid URL", function () {
            const validUrl = "https://google";
            isValidURL(validUrl).should.be.false;
        })

        it("Should return false on no params provided", function () {
            isValidURL(undefined as any as string).should.be.false;
        })
    });

    describe("A LinkShortener instance", function () {
        this.beforeEach(function () {
            this.linkShortener = new LinkShortener(VALID_URL);
        })

        it("Should exist after calling its constructor", function () {
            this.linkShortener.should.exist;
        })

        it("Should have a hashcode string", function () {
            this.linkShortener.hash.should.be.a('string');
        })

        it("Should keep its original url formatted", function () {
            this.linkShortener.url.should.equal(VALID_URL.toLowerCase());
        })

        it("Should be able to generate a correct shortenURL", function () {
            this.linkShortener.getShortenedLink().should.equal(`${BASE_URL}${this.linkShortener.hash}`);
        })
    });
});