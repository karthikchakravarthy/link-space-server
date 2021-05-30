const express = require("express");
const cors = require("cors");
const links = require("../routes/links");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/links", links);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
