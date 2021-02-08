const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Hacks = require("../../models/Hackaton/Hacks");

//@route POST api/hack/
//@desc create new hackaton
router.post(
  "/",
  auth,
  [
    check("name", "Укажите название Хакатона").not().isEmpty(),
    check("period", "Укажите период проведения").not().isEmpty(),
  ],
  async (req, res) => {
    //check data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check role
    if (req.user.role !== "admin") {
      return res.status(401).json({ msg: "Нет доступа" });
    }
    try {
      //get data from req
      const { name, period } = req.body;
      const hack = new Hacks({ name, period });
      //save data
      await hack.save();
      //response to client
      return res.json(haks);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

//@route GET api/hack/all
//@desc get all hack for admin hackatons
router.get("/all", auth, async (req, res) => {
  try {
    const hacks = await Hack.find().sort({ date: -1 });
    res.send(hacks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route GET api/hack
//@desc get ongoing hack
router.get("/", auth, async (req, res) => {
  try {
    const hack = await Hack.findOne({ status: "ongoing" });
    res.json(hack);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route PUT api/hack/:id
//@desc change status hackaton
router.put("/:id", auth, async (req, res) => {
  //check role
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "Нет доступа" });
  }
  try {
    //get hackaton by id
    let hack = await Hack.findById(req.params.id);
    //change status
    hack.status = "close";
    hack.save();
    //response to user
    res.json(hack);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

module.exports = router;