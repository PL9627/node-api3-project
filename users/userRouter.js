const express = require("express");
const users = require("./userDb");

const router = express.Router();

router.post("/", (req, res, next) => {
  // do your magic!
  users
    .insert(req.body)
    .then((user) => {
      res, status(201).json(user);
    })
    .catch(next);
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  // do your magic!
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users
    .getById()
    .then((user) => {
      if (user) {
        req.user = user;

        next();
      } else {
        res.status(404).json({
          message: "invalid user id",
        });
      }
    })
    .catch(next);
}

function validateUser(req, res, next) {
  // do your magic!
  if (!req.body) {
    res.status(400).json({
      message: "missing user data",
    });
  } else if (!req.body.name) {
    res.status(400).json({
      message: "missing required name field",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
