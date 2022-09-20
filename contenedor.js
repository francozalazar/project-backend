const fs = require("fs")

module.exports = class Contenedor{
    constructor(nombreArchivo){
        this.ruta = `${nombreArchivo}`
    }

    async save(producto){
        try {
            const contenido = await this.getAll() || []
            console.log(contenido)
            let id
            if(!producto.id || contenido.some(el => el.id === id)){
                switch(contenido.length){
                    case 0:
                        id = 1
                        break;
                    case 1:
                        id = 2
                        break;
                    default:
                        id = [...contenido].sort((a,b) => b.id - a.id)[0].id + 1
                }
            }
            producto.id = id
            contenido.push(producto)
            await fs.promises.writeFile(this.ruta, JSON.stringify(contenido, null, 2), "utf-8")
        } catch (error) {
            console.log("💥 Hubo un error al guardar en el archivo: " + error)
        }
    }

    async getById(id){
        try {
            return (await this.getAll()).filter(el => el.id === id)
        } catch (error) {
            console.log("💥 Hubo un error leer el archivo: " + error)
        }
    }

    async getAll(){
        try {
            const contenido = await fs.promises.readFile(this.ruta, "utf-8")
            return JSON.parse(contenido)
        } catch (error) {
            console.log("💥 No se pudo leer el archivo: " + error)
        }
    }

    async deleteById(id){
        try {
            const newArray = (await this.getAll()).filter(el => el.id !== id)
            await fs.promises.writeFile(this.ruta, JSON.stringify(newArray, null, 2))
            console.log(`Se elimino el id de producto ${id}`)
        } catch (error) {
            console.log("💥 Hubo un error al sobrescribir el archivo: " + error)
        }
    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.ruta, "[]")
        } catch (error) {
            console.log("💥 Hubo un error al sobrescribir el archivo: " + error)
        }
    }
}
