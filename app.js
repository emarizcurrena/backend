import express from 'express'
import productManager from './productManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/api/products', async (req, res) => {
    const { limit } = req.query
    try {
        const products = await productManager.getProducts()
        if (limit) {
            res.status(200).json({ message: 'Products', products: products.slice(0, limit) })
        } else {
            res.status(200).json({ message: 'Products', products })
        }
    } catch (error) {
        res.status(500).json({ error })
    }

})

app.get('/api/products/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const product = await productManager.getProductById(+idProduct)
        res.status(200).json({ message: 'Product', product })
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.post('/api/products', async (req, res) => {
    console.log(req.body)
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(200).json({ message: 'Product added', product: newProduct })
    } catch (error) {
        res.status(500).json({ error })
    }
})


app.put('/api/products/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const productUpdated = await productManager.updateProduct(+idProduct, req.body)
        res.status(200).json({ message: "Product updated" })
    } catch (error) {
        res.status(500).json({ error })
    }
})




app.delete('/api/products/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const response = await productManager.deleteProduct(+idProduct)
        res.status(200).json({ message: "Product Deleted" })
    } catch (error) {
        res.status(500).json({ error })
    }
})




app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})