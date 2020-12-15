const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
    return [
        {
            id: 1,
            full_name: 'John Doe',
            email: 'john.doe@gmail.com',
            password: 'password',
        },
        {
            id: 2,
            full_name: 'Test user 2',
            email: 'jane.doe@gmail.com',
            password: 'password',
        },
    ]
}

function makeEventsArray(users) {
    return [
        {
            id: 1,
            title: 'First test post!',
            event_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            event_date: new Date('2020-12-22T16:28:32.615Z'),
            user_id: users[0].id,
        },
        {
            id: 2,
            title: 'Second test post!',
            event_desc: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus consequuntur deserunt commodi, nobis qui inventore corrupti iusto aliquid debitis unde non.Adipisci, pariatur.Molestiae, libero esse hic adipisci autem neque ?',
            event_date: new Date('2020-12-24T16:28:32.615Z'),
            user_id: users[1].id,
        },
    ]
}

function makeExpectedEvent(users, event) {
    const user_id = users.find(user => user.id === event.user_id)

    return {
        id: event.id,
        title: event.title,
        event_desc: event.event_desc,
        event_date: event.event_date,
        user_id: user_id
    }
}

function makeFixtures() {
    const testUsers = makeUsersArray()
    const testEvents = makeEventsArray(testUsers)
    return { testUsers, testEvents }
}

function cleanTables(db) {
    return db.transaction(trx =>
        trx.raw(
            `TRUNCATE
        col_events,
        col_users;
      `
        )
            .then(() =>
                Promise.all([
                    trx.raw(`ALTER SEQUENCE col_events_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`ALTER SEQUENCE col_users_id_seq minvalue 0 START WITH 1`),
                    trx.raw(`SELECT setval('col_events_id_seq', 0)`),
                    trx.raw(`SELECT setval('col_users_id_seq', 0)`),
                ])
            )
    )
}

function seedUsers(db, users) {
    const preppedUsers = users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 1)
    }))
    return db.into('col_users').insert(preppedUsers)
        .then(() =>
            // update the auto sequence to stay in sync
            db.raw(
                `SELECT setval('col_users_id_seq', ?)`,
                [users[users.length - 1].id],
            )
        )
}

function seedEventsTables(db, users, event) {
    // use a transaction to group the queries and auto rollback on any failure
    return db.transaction(async trx => {
        await seedUsers(trx, users)
        await trx.into('col_events').insert(event)
        // update the auto sequence to match the forced id values
        await trx.raw(
            `SELECT setval('col_events_id_seq', ?)`,
            [event[event.length - 1].id],
        )
    })
}


function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
    const token = jwt.sign({ user_id: user.id }, secret, {
        subject: user.email,
        algorithm: 'HS256',
    })
    return `Bearer ${token}`
}

module.exports = {
    makeUsersArray,
    makeEventsArray,
    makeExpectedEvent,
    makeFixtures,
    cleanTables,
    seedEventsTables,
    makeAuthHeader,
    seedUsers,
}