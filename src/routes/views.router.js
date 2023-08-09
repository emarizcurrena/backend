import { Router } from 'express';
import productManager from '../productManager.js'

const router = Router()

router.get('/allproducts', async (req, res) => {
    const products = await productManager.getProducts()
    res.send('allproducts', { products })
})

export default router