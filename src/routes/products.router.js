import { Router } from "express";
import productManager from '../productManager.js'

const router = Router()

router.get('/', async (req, res) => {
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

router.get('/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const product = await productManager.getProductById(+idProduct)
        res.status(200).json({ message: 'Product', product })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const newProduct = await productManager.addProduct(req.body)
        res.status(200).json({ message: 'Product added', product: newProduct })
    } catch (error) {
        res.status(500).json({ error })
    }
})


router.put('/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const productUpdated = await productManager.updateProduct(+idProduct, req.body)
        res.status(200).json({ message: "Product updated" })
    } catch (error) {
        res.status(500).json({ error })
    }
})




router.delete('/:idProduct', async (req, res) => {
    const { idProduct } = req.params
    try {
        const response = await productManager.deleteProduct(+idProduct)
        res.status(200).json({ message: "Product Deleted" })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    await await productManager.addProduct(req.body)
    res.redirect('/realTimeProducts')
})



export default router