import fs from 'fs'
import { __dirname } from './utils.js'

class ProductManager {
    constructor(path) {
        this.path = path
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
                return JSON.parse(infoArchivo)
            } else {
                return []
            }
        } catch (error) {
            return error
        }
    }

    async addProduct(producto) {
        try {
            const productosPrev = await this.getProducts()
            let id
            if (!productosPrev.length) {
                id = 1
            } else {
                id = productosPrev[productosPrev.length - 1].id + 1
            }
            const newProduct = { ...producto, id }
            productosPrev.push(newProduct)
            await fs.promises.writeFile(this.path, JSON.stringify(productosPrev))
            return newProduct
        } catch (error) {
            return error
        }
    }

    async getProductById(id) {
        try {
            const productosPrev = await this.getProducts()
            const prod = productosPrev.find((p) => p.id === id)
            if (!prod) {
                return `No existe el producto con id ${id}`
            }
            return prod
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, prod) {
        try {
            const productosPrev = await this.getProducts()
            const productoIndex = productosPrev.findIndex((u) => u.id === id)
            if (productoIndex === -1) {
                return `No hay un producto con id ${id}`
            }
            const producto = productosPrev[productoIndex]
            productosPrev[productoIndex] = { ...producto, ...prod }
            await fs.promises.writeFile(this.path, JSON.stringify(productosPrev))
        } catch (error) {
            return error
        }
    }

    async deleteProduct(id) {
        try {
            const productosPrev = await this.getProducts()
            const nuevoArrayProductos = productosPrev.filter((p) => p.id !== id)
            await fs.promises.writeFile(this.path, JSON.stringify(nuevoArrayProductos))
        } catch (error) {
            return error
        }
    }

}

// const producto1 = {
//     title: 'remera',
//     description: 'manga larga',
//     price: 25,
//     thumbnail: 'cccccc',
//     code: 'x1x1x1',
//     stock: 60
// }

// const prod = {
//     price: 22,
//     stock: 55
// }

// const producto2 = {
//     title: 'buzo',
//     description: 'azul',
//     price: 20,
//     thumbnail: 'vvvvvv',
//     code: 'x2x2x2',
//     stock: 5
// }

// const producto3 = {
//     title: 'pantalon',
//     description: 'con bolsillos',
//     price: 38,
//     thumbnail: 'mmmmmm',
//     code: 'x7x7x7',
//     stock: 12
// }

// async function prueba() {
//     const manager = new ProductManager('Productos.json')
//     //await manager.addProduct(producto1)
//     //const productos = await manager.getProducts()
//     //console.log(productos)
//     //const producto = await manager.getProductById(8)
//     //console.log(producto)
//     //await manager.deleteProduct(1)
//     await manager.updateProduct(2, prod)
// }

// prueba()

const productManager = new ProductManager(__dirname + '/Products.json')
export default productManager