const xss = require('xss');

const ProfileService = {
    // this query checks to see of a user has a phone number 
    userHasNumber(db, user_id) {
        return db.raw(`SELECT EXISTS(SELECT users_number FROM phone_number WHERE user_id = ${user_id});`)
    },
    // this query responds with profile info for users that don't have a phone number registered in the database
    getProfile(db, user_id) {
        return db('col_users')
            .select('full_name', 'email')
            .where({ 'id': user_id })
            .first()
    },
    // this query responds with profile info for users that have a phone number registered in the database
    getProfileWithNumber(db, user_id) {
        return db('col_users')
            .join('phone_number', 'col_users.id', '=', 'phone_number.user_id')
            .select('col_users.full_name', 'col_users.email', 'phone_number.users_number')
            .where({ 'col_users.id': user_id })
            .first()
    },
    //  this query is used to delete the user's profile
    deleteProfile(db, user_id) {
        return db('col_users')
            .where({ 'id': user_id })
            .delete()
    },
    // this is for adding a phone number to profile
    postPhoneNumber(db, newPhoneNumber) {
        return db
        .insert(newPhoneNumber)
        .into('phone_number')
        .returning('*')
        .then(([phoneNumber]) => phoneNumber)
    },
    serializePhoneNumber(phoneNumber) {
        return {
            id: phoneNumber.id,
            users_number: xss(phoneNumber.users_number),
            user_id: phoneNumber.user_id
        }
    },
    // this is for deleting a phone number from user's profile
    deletePhoneNumber(db, user_id) {
        return db('phone_number')
            .where({ 'user_id': user_id })
            .delete()
    }
}

module.exports = ProfileService;