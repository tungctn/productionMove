const productlineRoute = require('express').Router()
const ProductLineController = require('../Controllers/ProductLineController')
productlineRoute.post('/', ProductLineController.productLineCreate)
productlineRoute.get('/:id', ProductLineController.productLineInfo)
productlineRoute.put('/:id', ProductLineController.productLineUpdate)
productlineRoute.delete('/:id', ProductLineController.productLineDelete)

module.exports = productlineRoute