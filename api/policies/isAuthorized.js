const jwToken = require('../services/jwToken');

module.exports = function (req, res, next) {
    if (!req.headers?.authorization)
        return res.json(401, { err: 'No Authorization header was found' });

    let parts = req.headers.authorization.split(' ');

    if (parts.length != 2)
        return res.json(401, { err: 'Format is Authorization: Bearer [token]' });


    let scheme = parts[0];
    let credentials = parts[1];
    let token;

    if (/^Bearer$/i.test(scheme)) {
        token = credentials;
    }

    jwToken.verify(token, function (err, decoded) {
        if (err) {
            return res.json(401, { err: 'Invalid token' });
        }
        req.user = decoded;
        next();
    });
};