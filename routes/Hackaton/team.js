const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Teams = require("../../models/Hackaton/Teams");
const User = require("../../models/User");
const Hack = require("../../models/Hackaton/Hacks");

//@route POST api/hack/teams
//@desc create and update team profile
router.post(
  "/",
  auth,
  [check("name", "Укажите название команды").not().isEmpty()],
  async (req, res) => {
    //valid data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //get data from req
    const { name, hack, task, link } = req.body;
    //create team obj
    let teamObj = {
      name: name,
      hackaton: { hack: hack, task: task, link: link },
    };
    try {
      //check team exists
      let team = await Teams.findOne({
        team: { $elemMatch: { user: req.user.id } },
      });
      //if exist update
      if (team) {
        team = await Teams.findOneAndUpdate(
          { team: { $elemMatch: { user: req.user.id } } },
          { $set: teamObj },
          { new: true, upsert: true }
        );
        return res.send(team);
      }
      //create new team
      teamObj.team = {
        user: req.user.id,
        status: "captain",
      };
      team = new Teams(teamObj);
      await team.save();
      res.send(team);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

//@route GET api/hack/teams/all
//@desc get all teams for adminn panel
router.get("/all", auth, async (req, res) => {
  //check role
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "Нет доступа" });
  }
  try {
    let team = await Teams.find()
      .populate("hackaton.hack", "name period")
      .populate("hackaton.task", "title description")
      .populate("team.user", "name email avatar");
    if (team) res.send(team);
    else return res.status(404).json({ msg: "Команда отсутсвует" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route GET api/hack/teams/me
//@desc get my team profile
router.get("/me", auth, async (req, res) => {
  try {
    let team = await Teams.findOne({
      team: { $elemMatch: { user: req.user.id } },
    })
      .populate("hackaton.hack", "name period")
      .populate("hackaton.task", "title description")
      .populate("team.user", "name avatar");
    if (team) return res.send(team);
    else return res.status(404).json({ msg: "Команда отсутсвует" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route PUT /api/hack/teams/add
//desc add new teammate
router.put(
  "/add",
  auth,
  [check("email", "Укажите корректный email адрес").isEmail()],
  async (req, res) => {
    //valid data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //get data from req
    const { id, email } = req.body;
    //check email in users
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        msg: "Пользователь не зарегистрирован",
        color: "red",
      });
    }
    try {
      //get team obj
      let team = await Teams.findOne({
        team: { $elemMatch: { user: user._id } },
      });
      //check if team exist
      if (team) {
        res.status(400).json({
          msg: "Пользователь уже зарегистрирован в команде",
          color: "red",
        });
      } else {
        //find team by id
        const teamMate = await Teams.findById(id);
        //check team count
        if (teamMate.team.length > 4) {
          res
            .status(400)
            .json({ msg: "Превышен лимит участников команды", color: "red" });
        } else {
          //add new teammate
          teamMate.team.push({ user: user.id });
          //save team obj
          await teamMate.save();
          //send response to client
          res
            .status(200)
            .json({ msg: "Пользователь добавлен в команду", color: "green" });
        }
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Ошибка сервера" });
    }
  }
);

//@route DELETE api/hack/teams
//@desc Delete team
router.delete("/:id", auth, async (req, res) => {
  //get id from req
  try {
    //find team
    let team = await Teams.findById(req.params.id);
    //delete team
    await team.remove();
    res.status(202).json({ msg: "Команда удалена" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера" });
  }
});

//@route DELETE api/hack/teams/mate/id
//@desc delete teammate
router.delete("/mate/:id", auth, async (req, res) => {
  try {
    //get data from req
    const id = req.params.id;
    //find user team
    let team = await Teams.findOne({
      team: { $elemMatch: { user: id } },
    });
    //delete teammate from team
    const index = team.team.map((item) => item.user).indexOf(id);
    team.team.splice(index, 1);
    //save team obj
    await team.save();
    //response to client
    res.status(202).json({ msg: "Участник удален", color: "green" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Ошибка сервера", color: "red" });
  }
});

module.exports = router;
