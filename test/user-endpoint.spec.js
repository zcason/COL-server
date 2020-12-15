const knex = require('knex')
const jwt = require('jsonwebtoken')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('User Endpoints', function () {
    let db

    const { testUsers } = helpers.makeFixtures()
    const testUser = testUsers[0]

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup', () => helpers.cleanTables(db))

    afterEach('cleanup', () => helpers.cleanTables(db))

    describe("user registration test", () => {

        it("can post a new user", () => {

            return supertest(app)
                .post("/api/create-account")
                .send({
                    "email": "john.doe@gmail.com",
                    "full_name": "john doe",
                    "password": "Password01!"
                })
                .expect(201, {
                    "id": 1,
                    "full_name": "john doe",
                    "email": "john.doe@gmail.com"
                })
        })
    })

})
