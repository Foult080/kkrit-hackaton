const express = require('express');
const router = express.Router();
const Employer = require('../models/Employer');
const Event = require('../models/Event');

router.get('/', async (req,res) => {
    try {
        //get events 
        let date = Date.now();
        const events = await Event.find({date: {$gt: date}}).sort({ date: 'asc'}).select('-createDate').limit(3);
        //get list of employres
        const employers = await Employer.find().select('name vacancy description ').limit(4);
        //make info obj
        const info = {
            events,
            employers
        }
        //send data
        res.json(info)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Ошибка сервера');
    }
})


module.exports = router;





//const events = await Event.find({date: {$gt: date}}).sort({ date: 'asc'}).select('-createDate').limit(3);
// const employers = await Employer.find().select('name vacancy description ').limit(4);