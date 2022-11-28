const productLineRoute = require('express').Router()
const ProductLineController = require('../Controllers/ProductLineController')
productLineRoute.post('/', ProductLineController.createProductLine)
productLineRoute.get('/:id', ProductLineController.getProductLine)
productLineRoute.put('/:id', ProductLineController.updateProductLine)
productLineRoute.delete('/:id', ProductLineController.deleteProductLine)
productLineRoute.get('/', ProductLineController.productLineList)

module.exports = productLineRoute