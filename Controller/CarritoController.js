import CarritoDAO from "../Model/CarritoDAO.js";

class CarritoController {
    carritoDAO;

    constructor() {
        this.carritoDAO = new CarritoDAO;

    }
    obtener() {
        return  this.carritoDAO.obtener();

    }

    agregaPelicula(pelicula) {
        this.carritoDAO.agregaPelicula(pelicula);
    }

    quitarPelicula(indice) {
        this.carritoDAO.quitarPelicula(indice);

    }

    limpiar() {
        this.carritoDAO.limpiar();
    }

}

export default CarritoController;