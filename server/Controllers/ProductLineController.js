const ProductLineModel = require("../Models/ProductLineModel");

module.exports.createProductLine = async (req, res, next) => {
  try {
    const newProductLine = await new ProductLineModel({
      // code: req.body.code,
      // img: req.body.img,
      // name: req.body.name,
      // weight: req.body.weight,
      // length: req.body.length,
      // width: req.body.width,
      // height: req.body.height,
      // wheelAxleDistance: req.body.wheelAxleDistance,
      // saddleHeight: req.body.saddleHeight,
      // groundClearance: req.body.groundClearance,
      // petrolTankCapacity: req.body.petrolTankCapacity,
      // fuelConsumption: req.body.fuelConsumption,
      // displacementVolume: req.body.displacementVolume,
      // engineType: req.body.engineType,
      ...req.body
    }).save();
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newProductLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.getProductLine = async (req, res, next) => {
  try {
    const productLine = await ProductLineModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: productLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.updateProductLine = async (req, res, next) => {
  try {
    const updateOps = {};
    for (const ops of req.body) {
      
      updateOps[ops.propName] = ops.value;
    }
     await ProductLineModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {...updateOps},
      }
    );
    const newProduct = await ProductLineModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.deleteProductLine = async (req, res, next) => {
  try {
    await ProductLineModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
};

module.exports.productLineList = async (req, res, next) => {
  try {
    const listProductLine = await ProductLineModel.find();
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: listProductLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
