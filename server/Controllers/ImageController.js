const response = require("../utils/Response");
const { cloudinary } = require("../utils/Cloudinary");

module.exports.uploadImage = async (req, res, next) => {
  const data = req.body.data;
  let uploadResponse = [];
  for (let index = 0; index < data.length; index++) {
    const response = await cloudinary.uploader.upload(data[index], {
      upload_preset: "ermxq7st",
      folder: "plm",
      resource_type: "image",
    });
    const { url } = response;
    uploadResponse.push(url);
  }

  return response.sendSuccessResponse(res, uploadResponse, "", 200);
};
