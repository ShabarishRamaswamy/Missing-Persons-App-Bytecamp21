// Dotenv
require('dotenv').config()

const assert = require('chai').assert
const user = require('../../src/routers/user')
const expect = require('chai').expect
const request = require('supertest')
const conn = require('../../src/db/mongoose.js')

describe('POST /login', () => {
    before((done) => {
        conn.connect()
            .then(() => done())
            .catch((err) => done(err))
    })

    it('OK, Logging in', (done) => {
        request(user)
        .post('/login')
        .send({
            email: process.env.testEmail,
            password: process.env.testPassword
        })
        .then((res) => {
            expect(res)
        })
    })
})