const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser(), (req, res, next) => {
  // do your magic!
  users
    .insert(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
});

router.post(
  "/:id/posts",
  validateUserId(),
  validatePost(),
  (req, res, next) => {
    // do your magic!
    posts
      .insert(req.body)
      .then((post) => {
        res.status(200).json(post);
      })
      .catch(next);
  }
);

router.get("/", (req, res, next) => {
  // do your magic!
  users
    .get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => next(err));
});

router.get("/:id", validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId(), (req, res, next) => {
  // do your magic!
  users
    .getUserPosts(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch(next);
});

router.delete("/:id", validateUserId(), (req, res, next) => {
  // do your magic!
  users
    .remove(req.params.id)
    .then(() => {
      res.status(200).json({
        message: "The user has been nuked",
      });
    })
    .catch(next);
});

router.put("/:id", validateUserId(), validateUser(), (req, res, nextƒ) => {
  // do your magic!
  users
    .update(req.params.id, req.body)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "The user could not be found",
        });
      }
    })
    .catch(next);
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  users
    .getById(req.params.id)
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
  if (!req.body) {
    res.status(400).json({
      message: "missing post data",
    });
  } else if (!req.body.text) {
    res.status(400).json({
      message: "missing required text field",
    });
  } else {
    next();
  }
}

module.exports = router;
