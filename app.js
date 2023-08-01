import express from 'express'
import productManager from './productManager.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/api/products', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.status(200).json({ message: 'Products', products })
    } catch (error) {
        res.status(500).json({ error })
    }

})










app.listen(8080, () => {
    console.log('Escuchando al puerto 8080')
})