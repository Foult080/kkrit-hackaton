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
    check("tasks", "Укажите задачи").not().isEmpty(),
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
      const { name, period, tasks } = req.body;
      const hack = new Hacks({ name, period, tasks });
      //save data
      await hack.save();
      //response to client
      return res.json(hack);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

////@route PUT api/hack/:id
//@desc edit hack by id
router.put("/:id", auth, async (req, res) => {
  //check role
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "Нет доступа" });
  }
  try {
    //get data from req
    const {name, period, tasks} = req.body;
    //make obj with fields
    let fields = {};
    if (name) fields.name = name;
    if (period) fields.period = period;
    if (tasks) fields.tasks = tasks;
    //get and update hackaton by id
    let hack = await Hacks.findOneAndUpdate(
      { _id: req.params.id },
      { $set: fields },
      { new: true, upsert: true }
    );
    //send hack to client
    return res.send(hack);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route GET api/hack/all
//@desc get all hack for admin hackatons
router.get("/all", auth, async (req, res) => {
  try {
    const hacks = await Hacks.find().populate("tasks").sort({ date: -1 });
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
    const hack = await Hacks.findOne({ status: "ready" }).populate("tasks");
    res.json(hack);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route PUT api/hack/:id
//@desc change status hackaton
router.put(
  "/status/:id",
  auth,
  [check("status", "Статус не выбран").not().isEmpty()],
  async (req, res) => {
    //check role
    if (req.user.role !== "admin") {
      return res.status(401).json({ msg: "Нет доступа" });
    }
    try {
      //get hackaton by id
      let hack = await Hacks.findById(req.params.id);
      //get status from req
      const status = req.body.status;
      //change status
      hack.status = status;
      hack.save();
      //response to user
      res.json(hack);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

module.exports = router;
