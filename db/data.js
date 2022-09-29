class ListaProductos{
    static _Productos = [];

    static agregarProducto(producto){
        ListaProductos._Productos.push(producto)
    }

    static obtenerProductos(){
        return ListaProductos._Productos
    }

    static validarID(id){
        if(isNaN(+id)){
            const error = new Error("El id no es un numero")
            error.statusCode = 400
            throw error
        }
        return id
    }
    
    static buscarProducto(id, accion, producto){
        ListaProductos.validarID(id)
    
        const indexProd = ListaProductos._Productos.findIndex((el) => el.id === +id)
    
        if(indexProd === -1){
            const error = new Error("No se ha encontrado el producto")
            error.statusCode = 400
            throw error
        }
    
        switch(accion){
            case "devolver":
                return ListaProductos._Productos[indexProd]
            case "cambiar":
                validarProducto(producto)
                return ListaProductos._Productos[indexProd] = {id: +id, ...producto}
            case "borrar":
                ListaProductos._Productos.splice(indexProd, 1)
                break;
        }
        
    }
    
    static validarProducto(producto){
        const keys = Object.keys(producto)
        if(keys.length !== 3){
            const error = new Error("Error en cantidad de parametros")
            error.statusCode = 400
            throw error
        }
    
        for(let key of keys){
            if(key !== "nombre" && key !== "precio" && key !== "url"){
                const error = new Error("Error en sintaxis de parametros")
                error.statusCode = 400
                throw error
            }
        }
    
        if(isNaN(producto.precio) || producto.precio === ""){
            const error = new Error("El precio no es un numero")
            error.statusCode = 400
            throw error
        }
    
        return producto
    }
}

module.exports = ListaProductos