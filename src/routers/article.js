const express = require("express");
const Article = require("../models/article");
const Comment = require("../models/comment");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("multer");
const comment = require("../models/comment");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:|\./g, "") + " - " + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Input type not valid!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/articles/all", (req, res) => {
  Article.find({})
    .then((article) => {
      if (!article) {
        res.status(404).send();
      }
      res.send(article);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

router.post("/articles", auth, async (req, res) => {
  const article = new Article({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await article.save();
    res.status(201).send(article);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/articles/images", upload.any(), auth, async (req, res) => {
  const article = new Article({
    ...req.body,
    image1: req.files[0] && req.files[0].path ? req.files[0].path : "",
    image2: req.files[1] && req.files[1].path ? req.files[1].path : "",
    image3: req.files[2] && req.files[2].path ? req.files[2].path : "",
    image4: req.files[3] && req.files[3].path ? req.files[3].path : "",
    owner: req.user._id,
  });
  try {
    await article.save();
    res.status(201).send(article);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/articles", auth, async (req, res) => {
  try {
    await req.user.populate("articles").execPopulate();
    res.send(req.user.articles);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/articles/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const article = await Article.findOne({ _id, owner: req.user._id });
    if (!article) {
      return res.status(404).send();
    }
    Comment.find({ article: _id })
      .then((result) => {
        article.comments = result;
        return res.send(article);
      })
      .catch((e) => {
        return res.status(500).send(e);
      });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/articles/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "title_sub", "Content", "date", "Completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }
  const _id = req.params.id;

  try {
    const article = await Article.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!article) {
      res.status(404).send();
    }
    updates.forEach((update) => (article[update] = req.body[update]));
    await article.save();
    res.send(article);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/articles/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const article = await Article.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!article) {
      return res.status(404).send();
    }
    res.send(article);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
