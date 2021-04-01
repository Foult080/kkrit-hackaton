const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Tasks = require("../../models/Hackaton/Tasks");

//@route POST api/hack/tasks
//@desc save new task
router.post(
  "/",
  auth,
  [
    check("title", "Укажите название задания").not().isEmpty(),
    check("description", "Укажите описание").not().isEmpty(),
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
      const { title, description, id } = req.body;
      if (id) {
        let task =  await Tasks.findById(id);
        task.title = title;
        task.description = description;
        await task.save();
        return res.json({ msg: "Задание обновлено", color: "green" });
      } else {
      //add task obj
      const taks = new Tasks({ title, description });
      //save task
      await taks.save();
      //send mesg to client
      return res.json({ msg: "Задание добавлено", color: "green" });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

//route PUT /api/hack/tasks
//@desc update task
router.put("/", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "Нет доступа" });
  }
  try {
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route GET api/hack/tasks
//@desc get all tasks
router.get("/", auth, async (req, res) => {
  //check role
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "Нет доступа" });
  }
  try {
    //gen all records
    let tasks = await Tasks.find();
    //send to client
    return res.send(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

module.exports = router;
