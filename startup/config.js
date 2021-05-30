const config = require("config");

module.exports = function () {
  if (!config.get("jwt_private_key")) {
    throw new Error("Fatal error! jwt_private_key is not defined");
  }
};
