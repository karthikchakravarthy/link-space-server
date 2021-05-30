const { Link, validate } = require("../models/link");
const _ = require("lodash");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const allLinks = await Link.find({ "user._id": req.user._id }).select({
    _id: 1,
    name: 1,
    link: 1,
  });
  res.send(allLinks);
});

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, link } = req.body;
  const user = req.user;

  const newLinkDB = new Link({
    name: name,
    link: link,
    user: {
      _id: user._id,
      name: user.name,
    },
  });
  const result = await newLinkDB.save();
  res.send(_.pick(result, ["_id", "name", "link"]));
});

router.put("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const result = await Link.findOneAndUpdate(
    { "user._id": user._id, _id: id },
    {
      $set: {
        name: req.body.name,
        link: req.body.link,
      },
    },
    { new: true }
  ).select({ _id: 1, name: 1, link: 1 });

  if (result) res.status(200).send(result);
  else res.status(404).send("The link with given ID was not found");
});

router.delete("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const result = await Link.findOneAndDelete({
    "user._id": user._id,
    _id: id,
  });
  if (result) res.send(_.pick(result, ["_id", "name", "link"]));
  else res.status(404).send("The link with given ID was not found");
});

router.get("/:id", auth, async (req, res) => {
  const id = req.params.id;
  const user = req.user;
  const result = await Link.find({ "user._id": user._id, _id: id }).select({
    _id: 1,
    name: 1,
    link: 1,
  });
  if (result) res.send(result);
  else res.status(404).send("The link with given ID was not found");
});

module.exports = router;
