const express = require('express')
const app = express()

const { products, books } = require('./data')

app.listen(5000, () => {
    console.log("Server is listening on port 5000")
})

app.use(express.json()) // parse json body content

/**
 * PUT = Update product
 */
app.put('/api/products/:productID', (req, res) => {
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
 * POST => Create product
 */
app.post('/api/products', (req, res) => {
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
 * GET => List all
 */
app.get('/api/products', (req, res) => {
    res.json(products)
})


// Listando todos os produtos sem exibir o price
app.get('/api/products', (req, res) => {
    const partial_products = products.map(product => {
        return { id: product.id, name: product.name }
    })
    res.json(partial_products)
})

/**
 * Buscando um produto pelo ID
 * E retornando erro caso o ID não exista
 * 
 * Exemplo de chamada => http://127.0.0.1:5000/api/products/1
 */
app.get('/api/products/:productID', (req, res) => {
    const id = Number(req.params.productID)
    const product = products.find(product => product.id === id)

    if (!product) return res.status(404).send('Product not found')

    res.json(product)
})

/**
 * Buscando um produto pelo nome usando query
 * 
 * Exemplo de chamada => http://127.0.0.1:5000/api/query?name=iphone
 */
app.get('/api/query/', (req, res) => {
    const name = req.query.name.toLowerCase()
    const product_result = products.filter(product => product.name.toLowerCase().includes(name))

    if (product_result.length < 1) return res.status(204).send('No products matched your search')

    res.json(product_result)
})

/**
 * Buscando um produto pelo nome usando query
 * 
 * Exemplo de chamada => http://127.0.0.1:5000/api/books/query?author=Author1
 */
app.get('/api/books/query/', (req, res) => {
    const byAuthor = req.query.author.toLowerCase()
    const bookByAuthor = books.filter(book => book.author.toLowerCase().includes(byAuthor))

    if (bookByAuthor.length < 1) return res.status(204).send('No products matched your search')


    res.json(bookByAuthor)
})