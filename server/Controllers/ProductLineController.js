const ProductLineModel = require("../Models/ProductLineModel");

module.exports.productLineCreate = async (req, res, next) => {
  try {
    const newProductLine = await new ProductLineModel({
      code: req.body.code,
      img: req.body.img,
      name: req.body.name,
      weight: req.body.weight,
      length: req.body.length,
      width: req.body.width,
      height: req.body.height,
      wheelAxleDistance: req.body.wheelAxleDistance,
      saddleHeight: req.body.saddleHeight,
      groundClearance: req.body.groundClearance,
      petrolTankCapacity: req.body.petrolTankCapacity,
      fuelConsumption: req.body.fuelConsumption,
      displacementVolume: req.body.displacementVolume,
      engineType: req.body.engineType,
    }).save();
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: newProductLine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

module.exports.productLineInfo = async (req, res, next) => {
  try {
    const productline = await ProductLineModel.findById(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: productline,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

module.exports.productLineUpdate = async (req, res, next) => {
  try {
    const productline = await ProductLineModel.findByIdAndUpdate(
      req.params.id,
      {
        img: req.body.img,
        name: req.body.name,
        weight: req.body.weight,
        length: req.body.length,
        width: req.body.width,
        height: req.body.height,
        wheelAxleDistance: req.body.wheelAxleDistance,
        saddleHeight: req.body.saddleHeight,
        groundClearance: req.body.groundClearance,
        petrolTankCapacity: req.body.petrolTankCapacity,
        fuelConsumption: req.body.fuelConsumption,
        displacementVolume: req.body.displacementVolume,
        engineType: req.body.engineType,
      }
    );
    return res.status(200).json({
      success: true,
      msg: "successful",
      data: productline,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

module.exports.productLineDelete = async (req, res, next) => {
  try {
    await ProductLineModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
      msg: "successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
