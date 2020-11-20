
const { token } = require('morgan');
const authService = require('../authorization/auth-service');

function requireAuth(req, res, next) {
    const authToken = req.get('Authrization') || '';
    let basicToken;


    if (!authToken.toLowerCase().startsWith('basic')) {
        return res.status(401).json({ error: 'Missing basic token' })
    } else {
        basicToken = authToken.slice('basic '.length, authToken.length)
    }

    const [tokenUserEmail, tokenPassword] = Buffer
        .from(basicToken, 'base64')
        .toString()
        .split(':')

    if (!tokenUserEmail || !tokenPassword) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    req.app.get('db')('col_users')
        .where({ email: tokenUserEmail })
        .first()
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized request' })
            };

            return authService.comparePasswords(tokenPassword, user.password)
                .then(passwordsMatch => {
                    if (!passwordsMatch) {
                        return res.status(401).json({ error: 'Unauthorized request' })
                    };
                    req.user = user;
                    next();
                });
        })
        .catch(next);
};

module.exports = {
    requireAuth,
};
