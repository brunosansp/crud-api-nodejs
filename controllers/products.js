
const products = require('../data.js')

/**
 * GET => List all
 */
const getProducts = ((req, res) => {
    res.json(products)
})

/**
 * Buscando um produto pelo ID
 * E retornando erro caso o ID não exista
 * 
 * Exemplo de chamada => http://127.0.0.1:5000/api/products/1
 */
const getProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)

    if (!product) {
        return res.status(404).send('Product not found')
    }
    res.json(product)
})

// Listando todos os produtos sem exibir o price
const getProductNoPrice = ((req, res) => {
    const partial_products = products.map(product => {
        return { id: product.id, name: product.name }
    })
    res.json(partial_products)
})

/**
 * Buscando um produto pelo nome usando query
 * 
 * Exemplo de chamada => http://127.0.0.1:5000/api/query?name=iphone
 */
const getProductByName = ((req, res) => {
    const name = req.query.name.toLowerCase()
    const product_result = products.filter(product => product.name.toLowerCase().includes(name))

    if (product_result.length < 1) return res.status(204).send('No products matched your search')

    res.json(product_result)
})

/**
 * POST => Create product
 */
const createProduct = ((req, res) => {
    console.log(req)
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    }
    products.push(newProduct)
    console.log(newProduct)
    res.status(201).json(newProduct)
})

/**
 * PUT = Update product
 */
const updateProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)

    if (index === -1) return res.status(404).send('Product not found')

    const updateProduct = {
        id: products[index].id,
        name: req.body.name,
        price: req.body.price
    }

    products[index] = updateProduct
    res.status(200).json('Product updated')
})

/**
 * DELETE = Delete product
 */
const deleteProduct = ((req, res) => {
    const id = Number(req.params.productID)
    const index = products.findIndex(product => product.id === id)

    if (index === -1) return res.status(404).send('Product not found')

    products.splice(index, 1)
    res.status(200).json('Product deleted')
})

module.exports = {
    getProducts,
    getProduct,
    getProductNoPrice,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct
}
