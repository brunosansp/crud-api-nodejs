const express = require('express')
const router = express.Router()

const {
    getProducts,
    getProduct,
    getProductByName,
    getProductNoPrice,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/products.js')

router.get('/', getProducts)

router.get('/:productID', getProduct)

router.get('/api/query/', getProductByName)

router.get('/api/products/noprice', getProductNoPrice)

router.post('/', createProduct)

router.put('/:productID', updateProduct)

router.delete('/:productID', deleteProduct)

module.exports = router