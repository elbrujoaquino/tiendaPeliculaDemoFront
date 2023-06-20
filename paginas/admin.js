import ABMCPeliculaController from "../Controller/ABMCPeliculaController.js";
import SesionController from "../Controller/SesionController.js";
import Pelicula from "../Model/Pelicula.js";


let abmcPeliculaController = new ABMCPeliculaController();
let sesionController = new SesionController();
let domFormularioPelicula;
let imagenCargadaFormulario = null;
let domImgenCargadaFormularioPreview;
let domListaPeliculas;
let domDatoUSuario;
let domBotonCerrarSesion;

window.onload = () => {

    if(!sesionController.haySesionActiva()){
        window.location.href="./../index.html";

    }else{
        domFormularioPelicula = document.querySelector("#formularioPelicula");
        domImgenCargadaFormularioPreview = document.querySelector("#imgenCargadaFormularioPreview");
        domListaPeliculas = document.querySelector("#listaPeliculas");
        domDatoUSuario = document.querySelector("#datoUsuario");
        domBotonCerrarSesion = document.querySelector("#botonCerrarSesion");
        agregarEventoFormularioPelicula();
        agregarEventoImagenCargadaFormularioPelicula();
        agregarEventoBotonCerrarSesion();
        mostrarUsuario();
        mostrarPeliculas();
    }

}

function cerrarSesion(){
    sesionController.cerrarSesion();
    if(!sesionController.haySesionActiva()){
        window.location.href="./../index.html";
    }
}

function mostrarUsuario(){
    domDatoUSuario.innerHTML = sesionController.getDatosSesion().usuario;
}

function agregarEventoBotonCerrarSesion(){
    domBotonCerrarSesion.onclick = ()=>{
        cerrarSesion();
    }
}


function agregarEventoFormularioPelicula() {
    domFormularioPelicula.onsubmit = () => {
        event.preventDefault();
        procesarFormularioPelicula();
    };
}

function agregarEventoImagenCargadaFormularioPelicula() {

    domFormularioPelicula.imagen.onchange = (event) => {
        let archivoImagen = event.target.files[0];
        let fileReader = new FileReader();
        domImgenCargadaFormularioPreview.src = "./../imagenes/cargando.gif";

        fileReader.onload = (event) => {
            imagenCargadaFormulario = event.target.result;
            console.log(imagenCargadaFormulario);
            domImgenCargadaFormularioPreview.src = imagenCargadaFormulario;
        }
        fileReader.readAsDataURL(archivoImagen);
    }
}

function procesarFormularioPelicula() {
    let pelicula = obtenerPeliculaDeFormularioPelicula();
    console.log(pelicula);
    if (domFormularioPelicula.boton.value == "Cargar") {
        cargarPelicula(pelicula);
    } else if (domFormularioPelicula.boton.value == "Modificar") {
        modificarPelicula(pelicula);
    }
    limpiarFormulario();
}


function obtenerPeliculaDeFormularioPelicula() {
    let codigo = domFormularioPelicula.codigo.value;
    let nombre = domFormularioPelicula.nombre.value;
    let genero = domFormularioPelicula.genero.value;
    let fechaEsteno = domFormularioPelicula.anio.value;
    let duracion = domFormularioPelicula.duracion.value;
    let sinopsis = domFormularioPelicula.sinopsis.value;
    let trailerURLYouTube = domFormularioPelicula.trailer.value;
    let precio = domFormularioPelicula.precio.value;
    let imagen = imagenCargadaFormulario;

    return new Pelicula(codigo, nombre, genero, fechaEsteno, duracion, sinopsis, trailerURLYouTube, precio, imagen);
}

function mostrarPeliculas() {
    let peliculas = abmcPeliculaController.obtenerPeliculas();
    console.log(peliculas);
    domListaPeliculas.innerHTML = "";
    peliculas.forEach(pelicula => {

        let seccionPelicula = document.createElement("section");
        seccionPelicula.className = "pelicula";

        let navOpciones = document.createElement("nav");
        navOpciones.className = "navOpciones";

        let buttonModificar = document.createElement("button");
        buttonModificar.for
        buttonModificar.innerHTML =  /* html */`
            <img src="./../imagenes/modiciar.svg"> 
        `;
        let buttonEliminar = document.createElement("button");
        buttonEliminar.innerHTML =  /* html */`
            <img src="./../imagenes/eliminar.svg" alt="">
        `;
        navOpciones.appendChild(buttonModificar);
        navOpciones.appendChild(buttonEliminar);

        buttonModificar.onclick = () => {
            activarModificarPelicula(pelicula);
        }

        buttonEliminar.onclick = ()=>{
            eliminarPelicula(pelicula);
        }


        let navGrafico = document.createElement("nav");
        navGrafico.className = "navGrafico";
        let buttonImagen = document.createElement("button");
        buttonImagen.innerHTML =  /* html */`
            <img src="./../imagenes/camara.svg"> 
        `;
        let buttonGrafico = document.createElement("button");
        buttonGrafico.innerHTML =  /* html */`
            <img src="./../imagenes/play.svg" alt="">
        `;
        navGrafico.appendChild(buttonImagen);
        navGrafico.appendChild(buttonGrafico);


        let grafico = document.createElement("section");
        grafico.className = "grafico";

        let contenedorGrafico = document.createElement("section");
        contenedorGrafico.className = "contenedorGrafico";
        grafico.appendChild(contenedorGrafico);

        contenedorGrafico.innerHTML = /* html */`
            <img src="${pelicula.imagen}" alt="">
            <iframe width="560" height="315" src="${pelicula.getEmbedTriler()}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
        seccionPelicula.onmouseleave = () => {
            contenedorGrafico.classList.remove('mostrarVideo')
            contenedorGrafico.classList.add('mostrarImagen');
        };
        buttonImagen.onclick = () => {
            contenedorGrafico.classList.remove('mostrarVideo')
            contenedorGrafico.classList.add('mostrarImagen');
        };
        buttonGrafico.onclick = () => {
            contenedorGrafico.classList.add('mostrarVideo')
            contenedorGrafico.classList.remove('mostrarImagen');
        };

        let informacion = document.createElement("section");
        informacion.className = "informacion";
        informacion.innerHTML = /* html */`
                <p>Código ${pelicula.codigo}</p>
                <p class="nombre">Nombre ${pelicula.nombre}</p>
                <p class="datosSecundarios">Género ${pelicula.genero}</p>
                <p class="datosSecundarios">Fecha de estreno ${pelicula.fechaEsteno}</p>
                <p class="datosSecundarios">Duración ${pelicula.duracion}</p>
                <p class="datosSecundarios">Precio ${pelicula.precio}$</p>
                <textarea class="datosSecundarios" readonly>Argumento\n${pelicula.sinopsis}</textarea>
        `;

        seccionPelicula.appendChild(navOpciones);
        seccionPelicula.appendChild(navGrafico);
        seccionPelicula.appendChild(grafico);
        seccionPelicula.appendChild(informacion);
        domListaPeliculas.appendChild(seccionPelicula);

    });
}

function cargarPelicula(peliculaNueva) {
    let estado = abmcPeliculaController.agregarPelicua(peliculaNueva);
    console.log(estado);
    mostrarPeliculas();
}

function modificarPelicula(peliculaNueva) {
    let estado = abmcPeliculaController.modificarPelicula(peliculaNueva,peliculaNueva.codigo);
    console.log(estado);
    mostrarPeliculas();
}

function eliminarPelicula(pelicula){
    let estado = abmcPeliculaController.eliminarPelicula(pelicula);
    console.log(estado);
    mostrarPeliculas();
}

function activarModificarPelicula(pelicula) {
    console.log(domFormularioPelicula);
    domFormularioPelicula.codigo.readOnly = true;
    domFormularioPelicula.nombre.focus();
    domFormularioPelicula.codigo.value = pelicula.codigo;
    domFormularioPelicula.nombre.value = pelicula.nombre;
    domFormularioPelicula.genero.value = pelicula.genero;
    domFormularioPelicula.anio.value = pelicula.fechaEsteno;
    domFormularioPelicula.duracion.value = pelicula.duracion;
    domFormularioPelicula.sinopsis.value = pelicula.sinopsis;
    domFormularioPelicula.trailer.value = pelicula.trailerURLYouTube;
    domFormularioPelicula.precio.value = pelicula.precio;
    domImgenCargadaFormularioPreview.src = pelicula.imagen;
    imagenCargadaFormulario = pelicula.imagen;
    domFormularioPelicula.imagen.required = false;
    domFormularioPelicula.boton.value = "Modificar";
    
}


function limpiarFormulario(){
    console.log(domFormularioPelicula);
    domFormularioPelicula.codigo.readOnly = false;
    domFormularioPelicula.codigo.value  = "";
    domFormularioPelicula.nombre.value =  "";
    domFormularioPelicula.genero.value =  "";
    domFormularioPelicula.anio.value = "";
    domFormularioPelicula.duracion.value = "";
    domFormularioPelicula.sinopsis.value = "";
    domFormularioPelicula.trailer.value = "";
    domFormularioPelicula.precio.value = "";
    domImgenCargadaFormularioPreview.src = "";
    imagenCargadaFormulario = null;
    domFormularioPelicula.imagen.required = true;
    domFormularioPelicula.boton.value = "Cargar";
    
}