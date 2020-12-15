const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Home Endpoints', function () {
    let db

    const {
        testUsers,
        testEvents
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

    describe(`GET /api/home/:begin-date/:end-date`, () => {
        context(`Given no events`, () => {
            beforeEach('insert users', () =>
                helpers.seedUsers(
                    db,
                    testUsers,
                )
            )
            it(`responds with 200 and []`, () => {
                return supertest(app)
                    .get('/api/home/2020-12-1/2020-12-31')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, [])
            })
        })


        context(`Given there are events`, () => {
            beforeEach('insert events', () =>
                helpers.seedEventsTables(
                    db,
                    testUsers,
                    testEvents
                )
            )


            it(`responds with 200 and list of events for the specific month`, () => {
                return supertest(app)
                    .get('/api/home/2020-12-1/2020-12-31')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(200, [{
                        id: 1,
                        title: 'First test post!',
                        event_date: '2020-12-22T16:28:32.615Z',
                        event_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
                    }])
            })
        })
    })

    describe(`DELETE /api/home/:id`, () => {
        context(`Given there are events`, () => {
            beforeEach('insert events', () =>
                helpers.seedEventsTables(
                    db,
                    testUsers,
                    testEvents
                )
            )

            it(`responds with 204 and deletes the specific event`, () => {
                return supertest(app)
                    .delete('/api/home/1')
                    .set("Authorization", helpers.makeAuthHeader(testUsers[0]))
                    .expect(204)
            })
        })
    })
})

