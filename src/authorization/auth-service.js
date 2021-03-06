const bycrpyt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const AuthService = {
    getUserWithEmail(db, user_email) {
        return db(db)
            .from('col_users')
            .where({ 'email': user_email })
            .first()
    },
    comparePasswords(password, hash) {
        return bycrpyt.compare(password, hash)
    },
    createJwt(subject, payload) {
        return jwt.sign(payload, config.JWT_SECRET, {
            subject,
            algorithm: 'HS256'
        });
    },
    verifyJwt(token) {
        return jwt.verify(token, config.JWT_SECRET, {
            algorithms: ['HS256'],
        })
    }
}

module.exports = AuthService; 