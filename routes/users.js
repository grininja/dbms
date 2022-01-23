var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
const { Sequelize, Model, Op } = require("sequelize");
const model = require("../model");
const { User, Stories, Task, Todo, Transcations, Admin } = model;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checktoken = require("../middlewares/checktoken");
const sendmail = require("../middlewares/sendmail");
////////////////////////////////////////////////////////////////////////////////////////////
router.post("/signup", async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  var otp = Math.floor(100000 + Math.random() * 900000).toString();
  var usr = {
    username: req.body.username,
    password: await bcrypt.hash(otp, salt),
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
  const sendmai = await sendmail(
    usr.email,
    "your password  for login is ",
    `<h1>${otp}</h1>
    <h2>you can change password in change password section</h2>
    `,
    (info) => {
      console.log(info);
      res.status(200).json({ message: "OTP sent to your email" });
    },
    (err) => {
      console.log(err);
      res.status(400).json({ message: "OTP not sent" });
    }
  );

  res.status(200).json(user);
});

router.post("/forgotPassword", async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } }).catch(
    (err) => {
      console.log(err);
    }
  );
  if (!user) {
    res.status(400).json({ message: "email not found" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const salt = await bcrypt.genSalt(10);
  const newpassword = await bcrypt.hash(otp, salt);
  const update = await User.update(
    { password: newpassword },
    { where: { email: req.body.email } }
  ).catch((err) => {
    console.log(err);
  });
  const resofemail = await sendmail(
    req.body.email,
    "your password for login is ",
    `<h1>${otp}</h1>
    <h2>you can change password in change password section</h2>
    `,
    (info) => {
      console.log(info);
      res.status(200).json({ message: "success" });
    },
    (err) => {
      console.log(err);
      res.status(400).json({ message: "password not sent some error occured" });
    }
  );
});

router.put("/updatepassword", checktoken, async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const user = await User.findOne({
    where: {
      id: req.user.id,
    },
  });
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save().catch((err) => {
    res.status(400).json({ message: "password not updated" });
  });
  res.status(200).json({ message: "password updated" });
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

router.get("/isAdmin", checktoken, async (req, res, next) => {
  const isadmin = await Admin.findAll({
    where: {
      username: req.user.username,
    },
  }).catch((e) => {
    console.log(e);
  });
  // console.log(isadmin);
  if (isadmin.length > 0) {
    res.status(200).json({
      isadmin: true,
    });
  } else {
    res.status(200).json({
      isadmin: false,
    });
  }
});

router.get("/fetchUserList", checktoken, async (req, res, next) => {
  const users = await User.findAll({
    where: {
      username: {
        [Op.ne]: req.user.username,
      },
    },
  }).catch((e) => {
    console.log(e);
  });
  const admins = await Admin.findAll({
    where: {
      username: {
        [Op.ne]: req.user.username,
      },
    },
  }).catch((e) => {
    console.log(e);
  });
  users.filter((user) => {
    admins.filter((admin) => {
      if (user.username === admin.username) {
        users.splice(users.indexOf(user), 1);
      }
    });
  });
  res.status(200).json(users);
});

router.get("/deleteuser/:username", checktoken, async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  }).catch((e) => {
    console.log(e);
  });
  if (user) {
    const check = await Admin.findOne({
      where: {
        username: req.user.username,
      },
    }).catch((e) => {
      console.log(e);
    });
    if (check) {
      const del = await User.destroy({
        where: {
          username: req.params.username,
        },
      }).catch((e) => {
        console.log(e);
      });
      res.status(200).json({
        message: "user deleted",
      });
    } else {
      res.status(401).json({
        message: "you are not admin",
      });
    }
  }
});

router.get("/logout", checktoken, async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.user.username,
    },
  }).catch((e) => {
    console.log(e);
  });
  if (user) {
    user.token = null;
    await user.save();
    res.status(200).json({
      auth: true,
      message: "Successfully logged out",
    });
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

router.delete("/deleteStory/:storyid", async (req, res, next) => {
  const story = await Stories.destroy({
    where: {
      id: req.params.storyid,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(story);
});

router.put("/getStoryByUser/:storyid", async (req, res, next) => {
  const story = await Stories.update(
    {
      title: req.body.title,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.storyid,
      },
    }
  ).catch((e) => {
    console.log(e);
  });
  return res.status(200).json(story);
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

router.post("/todos", checktoken, async (req, res, next) => {
  const todo = await Todo.create({
    title: req.body.title,
    creator: req.user.username,
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(todo);
});

router.get("/todos", checktoken, async (req, res, next) => {
  const todos = await Todo.findAll({
    where: {
      creator: req.user.username,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(todos);
});

router.delete("/todos/:todoId", checktoken, async (req, res, next) => {
  const todo = await Todo.destroy({
    where: {
      id: req.params.todoId,
      creator: req.user.username,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(todo);
});

router.get("/todos/:todoId", checktoken, async (req, res, next) => {
  const todo = await Todo.findOne({
    where: {
      id: req.params.todoId,
    },
  }).catch((e) => {
    console.log(e);
  });
  res.status(200).json(todo);
});

// router.post("/todoItems", checktoken, async (req, res, next) => {
//   const todoItem = await TodoItem.create({
//     text: req.body.text,
//     todoId: req.body.todoId,
//   }).catch((e) => {
//     console.log(e);
//   });
//   res.status(200).json(todoItem);
// });

// router.get("/todoItems/:todoItemId", checktoken, async (req, res, next) => {
//   const todoItem = await TodoItem.findOne({
//     where: {
//       todoId: req.params.todoItemId,
//     },
//   }).catch((e) => {
//     console.log(e);
//   });
//   res.status(200).json(todoItem);
// });

// router.delete("/todoItems/:todoItemId", checktoken, async (req, res, next) => {
//   const todoItem = await TodoItem.destroy({
//     where: {
//       id: req.params.todoItemId,
//     },
//   }).catch((e) => {
//     console.log(e);
//   });
//   res.status(200).json(todoItem);
// });

//transcations routes
///////////////////////////////////////////////////////////////////////////////
router.get("/userbudget", checktoken, async (req, res, next) => {
  const user = await User.findOne({
    where: {
      username: req.user.username,
    },
  }).catch((e) => {
    res.status(500).json(e);
  });
  const userbudget = { budget: user.budget };
  res.status(200).json(userbudget);
});
router.put("/updateuserbudget", checktoken, async (req, res, next) => {
  const user = await User.update(
    {
      budget: req.body.budget,
    },
    {
      where: {
        username: req.user.username,
      },
    }
  ).catch((e) => {
    console.log(e);
  });
  res.status(200).json(user);
});
router.get("/getTransactions", checktoken, async (req, res, next) => {
  const transcations = await Transcations.findAll({
    where: {
      creator: req.user.username,
    },
  }).catch((e) => {
    res.status(400).json(e);
    console.log(e);
  });
  res.status(200).json(transcations);
});

router.post("/addTransaction", checktoken, (req, res, next) => {
  const response = Transcations.create({
    text: req.body.text,
    amount: req.body.amount,
    creator: req.user.username,
  }).catch((e) => {
    res.status(400).json(e);
    console.log(e);
  });
  res.status(200).json(response);
});

router.delete("/deleteTransaction/:id", checktoken, (req, res, next) => {
  Transcations.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.status(200).json({
        message: "Transaction Deleted",
      });
    })
    .catch((e) => {
      res.status(400).json(e);
    });
});

module.exports = router;
