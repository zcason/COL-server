const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Create Event Endpoints', function () {
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

    describe(`POST /api/create-event`, () => {
        context(`Given the user is signed in`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(
                    db,
                    testUsers,
                )
            )
            it(`responds with 201 and creates the event`, () => {
                const newEvent = {
                    title: 'New test post!',
                    event_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    event_date: '2020-12-22T16:28:32.615Z'
                }

                return supertest(app)
                    .post('/api/create-event')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .send(newEvent)
                    .expect(201)
            })
        })
    })
})