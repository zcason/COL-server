

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

}

module.exports = ProfileService;