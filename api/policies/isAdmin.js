const jwToken = require('../services/jwToken');

module.exports = function (req, res, next) {
    if (!req.user?.data || req.user.data.role !== 'admin')
        return res.json(403, { err: 'Not Authorized' });
    next();
};