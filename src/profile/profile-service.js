const xss = require('xss');

const ProfileService = {
    // this query is used to the user's profile info
    getProfile(db, user_id) {
        return db('col_users')
            .select('full_name', 'email')
            .where({ 'id': user_id })
            .first()
    },

    //  this query is used to delete the user's profile
    deleteProfile(db, user_id) {
        return db('col_users')
            .where({ 'id': user_id })
            .delete()
    },

    // this for adding phone number to profile
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
    }

    // this for deleting phone number from profile 

}

module.exports = ProfileService;