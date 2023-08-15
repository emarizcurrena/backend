import { Router } from 'express';
import productManager from '../productManager.js';
import { usersManager } from '../UsersManager.js';

const router = Router()

// router.get('/allproducts', async (req, res) => {
//     const products = await productManager.getProducts()
//     res.send('allproducts', { products })
// })

const users = [
    {
        nombre: 'Alejandro',
        apellido: 'Alvarez',
        email: 'aalvarez@mail.com'
    },
    {
        nombre: 'Carolina',
        apellido: 'Suarez',
        email: 'csuarez@mail.com'
    },
    {
        nombre: 'Andres',
        apellido: 'Montenegro',
        email: 'amontenegro@mail.com'
    }
]

router.get('/vista1', (req, res) => {
    const index = Math.floor(Math.random() * 3)
    const user = users[index]
    res.render('vista1', { nombre: user.nombre, apellido: user.apellido, email: user.email })
})

router.get('/vista2', (req, res) => {
    res.render('vista2')
})

router.get('/viewlista', (req, res) => {
    res.render('lista', { users })
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/allusers', async (req, res) => {
    const users = await usersManager.findUsers()
    res.render('allusers', { users })
})

router.get('/home', async (req, res) => {
    const prods = await productManager.getProducts()
    console.log(prods)
    res.render('home', { prods })
})

export default router