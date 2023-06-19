import PeliculasDAO from "../Model/PeliculasDAO.js";

 class ABMCPeliculaController{
    peliculasDAO;

    constructor(){
        this.peliculasDAO= new PeliculasDAO();
    }

    obtenerPeliculas(){
        return this.peliculasDAO.obtenerPeliculas();
     }

    agregarPelicua(peliculaProcesada){
        return this.peliculasDAO.agregarPelicua(peliculaProcesada);
    }

    eliminarPelicula(peliculaProcesada){
        return this.peliculasDAO.eliminarPelicula(peliculaProcesada);
    }

    modificarPelicula(peliculaProcesada,codigo){
        return this.peliculasDAO.modificarPelicula(peliculaProcesada,codigo);
    }
}

export default ABMCPeliculaController;