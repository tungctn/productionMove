const AuthMiddleware = require("./isLogged");

module.exports.verifyAdmin = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
<<<<<<< HEAD
    if (req.user.admin) {
=======
    if (req.user.role === 1) {
>>>>>>> 261844288ca3a55b5d06a10b32b7e90e93148388
      next();
      return res.status(200).json({
        success: true,
        msg: "successful",
      });
    } else {
      return res.status(403).json({
        success: false,
<<<<<<< HEAD
        msg: "You're not admin",
=======
        msg: "You're not Admin",
>>>>>>> 261844288ca3a55b5d06a10b32b7e90e93148388
      });
    }
  });
};

module.exports.verifyFactory = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 2) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not Factory",
      });
    }
  });
};

<<<<<<< HEAD
module.exports.verifyDealer = async (req, res, next) => {
=======
module.exports.verifyStore = async (req, res, next) => {
>>>>>>> 261844288ca3a55b5d06a10b32b7e90e93148388
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 3) {
      next();
    } else {
      return res.status(403).json({
        success: false,
<<<<<<< HEAD
        msg: "You're not dealer",
=======
        msg: "You're not Store",
>>>>>>> 261844288ca3a55b5d06a10b32b7e90e93148388
      });
    }
  });
};

<<<<<<< HEAD


=======
module.exports.verifyWarrantyCenter = async (req, res, next) => {
  AuthMiddleware.verifyToken(req, res, () => {
    if (req.user.role === 4) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        msg: "You're not Warranty Center",
      });
    }
  });
};
>>>>>>> 261844288ca3a55b5d06a10b32b7e90e93148388
