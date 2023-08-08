import { Router } from "express";
import { cartManager } from "../cartManager.js";

const router = Router()

router.get('/id', async (req, res) => {
    const { id } = req.params
    try {
        const cart = await cartManager.getOneCart(+id)
        res.status(200).json({ message: 'Cart', cart })
    } catch (error) {
        res.status(500).json({ error })
    }

})

router.post('/', async (req, res) => {
    try {
        const createCart = await cartManager.createCart()
        res.status(200).json({ message: 'Cart', cart: createCart })
    } catch (error) {
        res.status(500).json({ error })
    }
})

router.post('/:idCart/Items/:idItem', async (req, res) => {
    const { idCart, idItem } = req.params
    try {
        const addItem = await cartManager.addItem(+idCart, +idItem)
        res.status(200).json({ message: 'Item-Cart', cart: addItem })
    } catch (error) {
        res.status(500).json({ error })
    }
})





export default router