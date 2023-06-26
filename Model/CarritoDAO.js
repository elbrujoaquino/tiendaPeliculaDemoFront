import ItemCarriro from "./ItemCarriro.js";

class CarritoDAO{
    localStorage;
    identificador;

    constructor(){
        this.localStorage= window.localStorage;
        this.identificador="carrito";
        if(JSON.parse(this.localStorage.getItem(this.identificador)) ==null){
            this.localStorage.setItem(this.identificador,JSON.stringify([]));
        }
    }

     obtener() {
        let carritoData = JSON.parse(this.localStorage.getItem(this.identificador));
        let carrito = [];
        carritoData.forEach(carritoData => {
            carrito.push(new ItemCarriro(carritoData.idPelicula,carritoData.nombrePelicula,carritoData.precio));
        });
        return carrito;

     }

    agregaPelicula(pelicula){
        let itemCarriro = new ItemCarriro(pelicula.codigo,pelicula.nombre,pelicula.precio);
        let carrito = this.obtener();
        carrito.push(itemCarriro);
        this.actualizar(carrito);
    }

    quitarPelicula(indice){
        let carrito = this.obtener();
        carrito.splice(indice,1);
        this.actualizar(carrito);
    
    }

    actualizar(carrito){
        this.localStorage.setItem(this.identificador,JSON.stringify(carrito));
    }

    limpiar(){
        this.localStorage.setItem(this.identificador,JSON.stringify([]));
    }


}

export default CarritoDAO;