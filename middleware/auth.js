const  jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //get token from header
    const token = req.header('x-auth-token');
    //check token
    if (!token) {
        return res.status(401).json({ msg: 'Нет токена, авторизация отклонена '});
    } 
    //verify token
    try {
        const decoded = jwt.verify(token, config.get('JWT'));
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Токен не верен' })
    }
}