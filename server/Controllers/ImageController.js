const response = require("../utils/Response");
// const cloudinary = require("cloudinary").v2;
const { cloudinary } = require("../utils/Cloudinary");

module.exports.uploadImage = async (req, res, next) => {
  // try {
  const fileStr = req.body.data;
  const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: "ermxq7st",
    folder: "plm",
  });
  return response.sendSuccessResponse(res, uploadResponse, "", 200);
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).json({ err: "Something went wrong" });
  // }
};
