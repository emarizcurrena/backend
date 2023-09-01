import express from 'express'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import products2Router from './routes/products2.router.js'
import cartRouter from './routes/cart.router.js'
import viewsRouter from './routes/views.router.js'
import usersRouter from './routes/users.router.js'
import { Server } from 'socket.io'
import './db/dbConfig.js'

const app = express()

// EXPRESS
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// ROUTES
app.use('/api/products', productsRouter)
app.use('/api/products2', products2Router)
app.use('/api/carts', cartRouter)
app.use('/api/views', viewsRouter)
app.use('/api/users', usersRouter)

const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT}`);
})

const socketServer = new Server(httpServer)

// const messages = []

const mensajes = []

socketServer.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado')
    })
    // socket.emit('bienvenida', `Bienvenido al socket.io usuario ${socket.id}`)
    // socket.on('respuestaBienvenida', (message) => {
    //     console.log(message);
    // })

    // socket.on('message', (message) => {
    //     messages.push({ id: socket.id, message })
    //     socketServer.emit('allMessages', messages)
    // })

    socket.on('mensaje', infoMensaje => {
        mensajes.push(infoMensaje)

        socketServer.emit('chat', mensajes)
    })

    socket.on('usuarioNuevo', usuario => {
        socket.broadcast.emit('broadcast', usuario)
    })
})