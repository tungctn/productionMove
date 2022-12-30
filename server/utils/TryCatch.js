const response = require("./Response");

module.exports = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((error) => {
      return response.sendErrorServerResponse(res, error);
    });
  };
};
