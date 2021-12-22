var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
const { Sequelize, Model, Op } = require("sequelize");
const model = require("../model");
const { User, Stories, Task } = model;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checktoken = require("../middlewares/checktoken");
const todos = require("../controllers/todoItemsController");
////////////////////////////////////////////////////////////////////////////////////////////
router.post("/signup", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  var usr = {
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, salt),
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
  };
  const check = await User.findOne({
    where: {
      [Op.or]: [{ username: usr.username }, { email: usr.email }],
    },
  }).catch((err) => {
    console.log(err);
  });
  if (check) {
    res.status(400).json({
      message: "username or email already exist",
    });
  }
  const user = await User.create(usr).catch((e) => {
    console.log(e);
  });
  res.status(200).json(user);
});

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  }).catch((e) => {
    console.log(e);
  });
  if (user) {
    const match = await bcrypt
      .compare(req.body.password, user.password)
      .catch((e) => {
        console.log(e);
      });
    if (match) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        "q12345",
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        auth: true,
        message: "Successfully logged in",
        token: token,
        user: user.username,
      });
    } else {
      res.status(401).json({
        auth: false,
        message: "Incorrect password",
      });
    }
  } else {
    res.status(401).json({
      message: "User not found",
    });
  }
});

router.get("/currentuser", (req, res, next) => {
  res.status(200).json(req.user);
});
////////////////////////////////////////////////////////////////////////////////////////////

router.post("/createstory", checktoken, async (req, res, next) => {
  const story = await Stories.create({
    title: req.body.title,
    description: req.body.description,
    author: req.user.username,
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(story);
});

router.get("/getStoryByUser", checktoken, async (req, res, next) => {
  const stories = await Stories.findAll({
    where: {
      author: req.user.username,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(stories);
});

router.delete("/deleteStory", async (req, res, next) => {
  const story = await Stories.destroy({
    where: {
      id: req.body.id,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(story);
});

////////////////////////////////////////////////////////////////////////////////////////////

router.post("/createTask", checktoken, async (req, res, next) => {
  const task = await Task.create({
    taskTitle: req.body.taskTitle,
    taskDescription: req.body.taskDescription,
    creator: req.user.username,
    dueDate: req.body.dueDate,
    status: "pending",
  }).catch((e) => {
    console.log(e);
  });
  res.status.json(task);
});

router.get("getTodayTaks", checktoken, async (req, res, next) => {
  const today = new Date();
  const todayDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const todayTasks = await Task.findAll({
    where: {
      creator: req.user.username,
      dueDate: todayDate,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(todayTasks);
});

router.delete("/deleteTask", checktoken, async (req, res, next) => {
  const task = await Task.destroy({
    where: {
      taskID: req.body.taskID,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(task);
});

////////////////////////////////////////////////////////////////////////////////////////////

router.post("/todos", checktoken, todos.create);
router.get("/todos", checktoken, todos.fetchAll);
router.get("/todos/:todoId", checktoken, todos.fetchOne);
router.put("/todos/:todoId", checktoken, todos.update);
router.delete("/todos/:todoId", checktoken, todos.delete);

module.exports = router;
