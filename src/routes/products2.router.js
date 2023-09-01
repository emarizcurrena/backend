import { Router } from "express";
import { productManager } from "../productManager2.js";

const router = Router()

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts()
        res.status(200).json({ message: 'Products', products })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const product = await productManager.getProductById(id)
        res.status(200).json({ message: 'Product', product })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.createProduct(req.body)
        res.status(200).json({ message: 'New Product', product: newProduct })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deleteProduct = await productManager.deleteProduct(id)
        res.status(200).json({ message: 'Product Deleted', product: deleteProduct })
    } catch (error) {
        res.status(500).json({ error })
    }
})

export default router