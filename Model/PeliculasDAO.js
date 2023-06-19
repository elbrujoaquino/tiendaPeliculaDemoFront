import Pelicula from "./Pelicula.js";

class PeliculasDAO{
    localStorage;
    identificador;

    constructor(){
        this.localStorage= window.localStorage;
        this.identificador="peliculas";
        if(JSON.parse(this.localStorage.getItem(this.identificador)) ==null){
            this.localStorage.setItem(this.identificador,JSON.stringify([]));
        }
    }

    obtenerPeliculas(){
        let peliculasLocalStorage = JSON.parse(this.localStorage.getItem(this.identificador));
        let peliculas = [];
        peliculasLocalStorage.forEach(peliculaLocalStorage => {
            peliculas.push(new Pelicula(
                    peliculaLocalStorage.codigo,
                    peliculaLocalStorage.nombre,
                    peliculaLocalStorage.genero,
                    peliculaLocalStorage.fechaEsteno,
                    peliculaLocalStorage.duracion,
                    peliculaLocalStorage.sinopsis,
                    peliculaLocalStorage.trailerURLYouTube,
                    peliculaLocalStorage.precio,
                    peliculaLocalStorage.imagen

                    )
            );
        });
        return peliculas;
     }

    agregarPelicua(peliculaProcesada){
        let peliculas = this.obtenerPeliculas();
        if(!this.existePelicula(peliculaProcesada)){
            peliculas.push(peliculaProcesada);
            this.actualizarPeliculas(peliculas);
            return "guardado";
        }else{
            return "duplicado";
        }

    }

    eliminarPelicula(peliculaProcesada){
        let peliculas = this.obtenerPeliculas();
        let indiciePelicula = this.obtenerIndicePeliculaByPelicula(peliculaProcesada);
        if(indiciePelicula != null){
            peliculas.splice(indiciePelicula,1);
            this.actualizarPeliculas(peliculas);
            return "eliminado";
        }else{
            return'noExiste'
        }
    }

    modificarPelicula(peliculaProcesada,codigo){
        let peliculas = this.obtenerPeliculas();
        let indiciePelicula = this.obtenerIndicePeliculaByCodigo(codigo);
        if(indiciePelicula != null){
            peliculas.splice(indiciePelicula,1,peliculaProcesada);
            this.actualizarPeliculas(peliculas);
            return "actualizado";
        }else{
            return'noExiste'
        }
    }

    actualizarPeliculas(peliculas){
        this.localStorage.setItem(this.identificador,JSON.stringify(peliculas));
    }

    obtenerIndicePeliculaByPelicula(peliculaProcesada){
        let peliculas = this.obtenerPeliculas();
        let indiciePelicula = peliculas.findIndex(pelicula => pelicula.codigo == peliculaProcesada.codigo);
        return indiciePelicula != -1 ? indiciePelicula : null;
    }

    obtenerIndicePeliculaByCodigo(codigoPeliculaProcesada){
        let peliculas = this.obtenerPeliculas();
        let indiciePelicula = peliculas.findIndex(pelicula => pelicula.codigo == codigoPeliculaProcesada);
        return indiciePelicula != -1 ? indiciePelicula : null;
    }

    existePelicula(peliculaProcesada){
        let peliculas = this.obtenerPeliculas();
        let indiciePelicula = peliculas.findIndex(pelicula => pelicula.codigo == peliculaProcesada.codigo);
        return indiciePelicula != -1;
    }


}

export default PeliculasDAO;