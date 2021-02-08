const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Event = require('../../models/Employers/Event');

// @route POST api/event
// @desc add new event
router.post('/', auth, [
    check('title', 'Укажите заголовок новости').not().isEmpty(),
    check('date', 'Укажите дату мероприятия').not().isEmpty()
], async (req, res) => {
    //валидация запроса
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check role
    if (req.user.role !== 'admin') {
        return res.status(401).send('Нет доступа');
    }

    try {
        //get data from req
        const { title, description, date } = req.body;   
        //make event object
        let eventFields = {
            title, description, date
        };
        //save object
        let event = new Event(eventFields);
        await event.save();
        res.json(event);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера');
    }
});

// @router GET api/events
// @desc last 3 events
router.get('/', async (req,res) => {
    try {
        let date = Date.now();
        const events = await Event.find({date: {$gt: date}}).sort({ date: 'asc'}).select('-createDate').limit(3);
        res.send(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера');
    }
})

// @router GET api/events/all
// @desc get all events
router.get('/all', async (req,res) => {
    try {
        let date = Date.now();
        const events = await Event.find({date: {$gt: date}}).sort({ date: 'asc'}).select('-createDate');
        res.send(events);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера');
    }
})


module.exports = router;