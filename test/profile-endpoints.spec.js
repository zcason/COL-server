const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Profile Endpoints', function () {
    let db

    const {
        testUsers,
    } = helpers.makeFixtures()

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

    describe(`GET /api/profile`, () => {
        context(`Given there is a user`, () => {
            beforeEach('insert profiles', () =>
                helpers.seedUsers(
                    db,
                    testUsers,
                )
            )

            it(`responds with 200 and the user can see their account info`, () => {
                return supertest(app)
                    .get('/api/profile')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, {
                        full_name: 'John Doe',
                        email: 'john.doe@gmail.com',
                    })
            })
        })
    })

    describe(`DELETE /api/profile`, () => {
        context(`Given there is a user`, () => {
            beforeEach('insert profiles', () =>
                helpers.seedUsers(
                    db,
                    testUsers,
                )
            )

            it(`responds with 204 and deletes the users account`, () => {
                return supertest(app)
                    .delete('/api/profile')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[1]))
                    .expect(204)
            })
        })
    })
})