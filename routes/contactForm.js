const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Contact = require("../models/Contact");

// @route POST api/contact
// @desc add data from contact from
router.post(
  "/",
  [check("form", "Введите описание").not().isEmpty()],
  async (req, res) => {
    //валидация запроса
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //get data from req
      const { email, title, form } = req.body;
      //make contact obj
      let contact = {
        email,
        title,
        form,
      };
      //save object
      let contactObj = new Contact(contact);
      await contactObj.save();
      res.json(contactObj);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Ошибка сервера");
    }
  }
);

// @router GET api/contact
// @desc last 3 news
router.get("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).send("Нет доступа");
  }
  try {
    let date = Date.now();
    const events = await Contact.find({ date: { $gt: date } })
      .sort({ date: "asc" })
      .limit(3);
    res.send(news);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Ошибка сервера");
  }
});

module.exports = router;

/*
    if (req.user.role !== 'admin') {
        return res.status(401).send('Нет доступа');
    }
*/
