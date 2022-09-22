const productos = require("../db/data")
const {Router} = require("express")
const router = Router()

let id = 5

const validarID = (id) => {
    if(isNaN(+id)){
        const error = new Error("El id no es un numero")
        error.statusCode = 400
        throw error
    }
    return id
}

const buscarProducto = (id, accion, producto) => {
    validarID(id)

    const indexProd = productos.findIndex((el) => el.id === +id)

    if(indexProd === -1){
        const error = new Error("No se ha encontrado el producto")
        error.statusCode = 400
        throw error
    }

    switch(accion){
        case "devolver":
            return productos[indexProd]
        case "cambiar":
            validarProducto(producto)
            return productos[indexProd] = {id: +id, ...producto}
        case "borrar":
            productos.splice(indexProd, 1)
            break;
    }
    
}

const validarProducto = (producto) => {
    const keys = Object.keys(producto)
    if(keys.length !== 2){
        const error = new Error("Error en cantidad de parametros")
        error.statusCode = 400
        throw error
    }

    for(let key of keys){
        if(key !== "nombre" && key !== "precio"){
            const error = new Error("Error en sintaxis de parametros")
            error.statusCode = 400
            throw error
        }
    }

    if(isNaN(producto.precio)){
        const error = new Error("El precio no es un numero")
        error.statusCode = 400
        throw error
    }

    producto.precio = +producto.precio

    return producto
}

router.get("/productos", (req, res) => {
    res.status(200).json(productos)
})

router.get("/productos/:id", (req, res, next) => {
    try {
        const prod = buscarProducto(req.params.id, "devolver")
        res.status(200).json(prod)
    } catch (error) {
        next(error)
    }
})

router.post("/productos", (req, res, next) => {
    try {
        const producto = validarProducto({...req.body})
        productos.push({id: id++, ...producto})
        res.status(200).json(productos[productos.length - 1])
    } catch (error) {
        next(error)
    }
    
})

router.put("/productos/:id", (req, res, next) => {
    try {
        const {body: data} = req;
        buscarProducto(req.params.id, "cambiar", data)
        res.status(204).end() 
    } catch (error) {
        next(error)
    }
})

router.delete("/productos/:id", (req, res, next) => {
    try {
        buscarProducto(req.params.id, "borrar")
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = router