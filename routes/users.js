const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const config = require('config');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


// @route POST api/users
// @desc register new user
router.post('/', [
    check('name').not().isEmpty(),
    check('role').not().isEmpty(),
    check('email').isEmail(),
    check('password', 'Укажите пароль длинной более 8 символов!').isLength({ min: 8 })
], async (req, res) => {
    //валидация запроса
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    try {
        //check email
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ errors: [{ msg: 'Пользователь уже зарегистрирован' }]});
        }
        //add avatar
        const avatar = gravatar.url( email, {
            s: '200',
        })

        //create user obj
        user = new User({
            name, email, avatar, password, role
        });

        //hash pass
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        //save user 
        await user.save();
        //gen token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload, 
            config.get('JWT'), 
            {expiresIn: 3600},
            (error, token)=> {
                if(error) throw error;
                res.json({ token });
            } );
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Ошибка сервера');
    } 
});

module.exports = router;