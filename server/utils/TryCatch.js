const response = require("./Response");

module.exports = (func) => {
  return (req, res, next) => {
    try {
      func(req, res, next);
    } catch (error) {
      response.sendErrorServerResponse(res, error);
    }
  };
};
