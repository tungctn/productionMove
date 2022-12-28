module.exports.sendSuccessResponse = (res, data, msg, status) => {
  return res.status(200).json({
    status: status,
    success: true,
    data: data,
    msg: msg,
  });
};

module.exports.sendErrorResponse = (res, error, status) => {
  return res.status(200).json({
    status: status,
    success: false,
    msg: error,
  });
};

module.exports.sendErrorServerResponse = (res, error) => {
  return res.status(500).json({
    success: false,
    msg: error.message,
  });
};
