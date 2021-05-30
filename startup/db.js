const mongoose = require("mongoose");
const winston = require("winston");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/linkSpaceDB")
    .then(() => winston.info("connection is successfull to mongoDB"));
};
