function requireAuth(req, res, next) {
    const authToken = req.get('Authrization') || '';
    let basicToken;


    if (!authToken.toLowerCase().startsWith('basic')) {
        return res.status(401).json({ error: 'Missing basic token' })
    } else {
        basicToken = authToken.slice('basic '.length, authToken.length)
    }

    const [tokenUserName, tokenPassword] = Buffer
        .from(basicToken, 'base64')
        .toString()
        .split(':')

    if (!tokenUserName || !tokenPassword) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    req.app.get('db')('col_users')
        .where({ user_name: tokenUserName })
        .first()
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Unauthorized request' })
            }

            next();
        })
        .catch(next);
};

module.exports = {
    requireAuth
};