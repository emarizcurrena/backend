import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// HANDLEBARS
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// ROUTES
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/views', viewsRouter)


const PORT = 8080

app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})