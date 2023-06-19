class Pelicula{
    codigo;
    nombre;
    genero;
    fechaEsteno;
    sinopsis;
    trailerURLYouTube;
    precio;
    imagen;
    duracion;
    constructor(codigo,nombre,genero,fechaEsteno,duracion,sinopsis,trailerURLYouTube,precio,imagen){
        this.codigo=codigo;
        this.nombre=nombre;
        this.genero=genero;
        this.fechaEsteno=fechaEsteno;
        this.duracion=duracion;
        this.sinopsis=sinopsis;
        this.trailerURLYouTube=trailerURLYouTube;
        this.precio=precio;
        this.imagen=imagen;
    }

    getEmbedTriler(){
        return this.trailerURLYouTube.replace("/watch?v=","/embed/");
    }
}

export default Pelicula;
