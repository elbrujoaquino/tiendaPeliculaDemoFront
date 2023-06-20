import ABMCPeliculaController from "./Controller/ABMCPeliculaController.js";
import SesionController from "./Controller/SesionController.js";
import DatosSesion from "./Model/DatosSesion.js";
import Pelicula from "./Model/Pelicula.js";
import Usuario from "./Model/Usuario.js";
import cargarDatosPrueba from "./Model/datosPrueba.js"

let aBMCPeliculaController = new ABMCPeliculaController();
let sesionController = new SesionController();
let domFormularioInicioSesion;
let domBotonCerrarSesion;
let domContenedorFormularioInicioSesion;
let domcontenedorSesionUsuario;
let domDatoSesionUsuario;
let domListaPeliculas;



window.onload = ()=>{
    domFormularioInicioSesion = document.querySelector("#formularioInicioSesion");
    domBotonCerrarSesion = document.querySelector("#botonCerrarSesion");
    domContenedorFormularioInicioSesion = document.querySelector("#contenedorFormularioInicioSesion");
    domcontenedorSesionUsuario = document.querySelector("#contenedorSesionUsuario");
    domDatoSesionUsuario = document.querySelector("#datoSesionUsuario");
    domListaPeliculas = document.querySelector("#listaPeliculas");
    
    cargarDatosPrueba();
    agregarEventoFormularioInicioSesion();
    agregarEventoBotonCerrarSesion();

    verificarSesion();
    mostrarPeliculas();
}

function verificarSesion(){
    if(sesionController.haySesionActiva()){
        let datoSesion = sesionController.getDatosSesion();
        if(datoSesion.tipo == Usuario.tipos.usuario){
            iniciarSesionUsuario();
            verDomcontenedorSesionUsuario(true);
            verDomContenedorFormularioInicioSesion(false);
        }else if(datoSesion.tipo == Usuario.tipos.administrador){
            iniciarSesionAdminstrador();
        }
    }else{
        verDomcontenedorSesionUsuario(false);
        verDomContenedorFormularioInicioSesion(true);
    }
}



function verDomContenedorFormularioInicioSesion(estado){
    if(estado){
        domContenedorFormularioInicioSesion.classList.remove("ocultar");
    }else{
        domContenedorFormularioInicioSesion.classList.add("ocultar");
    }
}

function verDomcontenedorSesionUsuario(estado){
    if(estado){
        domBotonCerrarSesion.classList.remove("ocultar");
    }else{
        domBotonCerrarSesion.classList.add("ocultar");
    }
}

function agregarEventoBotonCerrarSesion(){
    domBotonCerrarSesion.onclick = ()=>{
        cerrarSesion();
    }
}



function agregarEventoFormularioInicioSesion(){
    domFormularioInicioSesion.onsubmit = ()=>{
        event.preventDefault();
        iniciarSesion()
    }
}

function mostrarPeliculas(){
    let peliculas = aBMCPeliculaController.obtenerPeliculas();
    console.log(peliculas);
    peliculas.forEach((pelicula)=>{
        let domPelicula = document.createElement("section");
        domPelicula.className ="pelicula"
        domListaPeliculas.appendChild(domPelicula);
        
        let portadaPelicula = document.createElement("figure");
        portadaPelicula.className="portadaPelicula";
        portadaPelicula.innerHTML = /*html*/`
            <img src="${pelicula.imagen}" alt="">
            <figcaption>${pelicula.nombre}</figcaption>
        `;
        domPelicula.appendChild(portadaPelicula);

        let trailerPelicula = document.createElement("iframe");
        trailerPelicula.className = "trailerPelicula";
        trailerPelicula.src = pelicula.getEmbedTriler();
        domPelicula.appendChild(trailerPelicula);

        let informacionPelicula = document.createElement("section");
        informacionPelicula.className = "informacionPelicula";
        informacionPelicula.innerHTML = /* html */`
                <p class="datosSecundarios">Género ${pelicula.genero}</p>
                <p class="datosSecundarios">Fecha de estreno ${pelicula.fechaEsteno}</p>
                <p class="datosSecundarios">Duración ${pelicula.duracion}</p>
                <p class="datosSecundarios">Precio ${pelicula.precio}$</p>
                <textarea class="datosSecundarios" readonly>${pelicula.sinopsis}</textarea>
        `;

        domPelicula.appendChild(informacionPelicula);
    });

}


function iniciarSesion(){
    let datosSesion = obtenerDatosSesionDeFormularioInicioSesion();
    let confirmado = sesionController.iniciarSesion(datosSesion);
    if(confirmado){
        if(datosSesion.tipo == Usuario.tipos.administrador){
            iniciarSesionAdminstrador();
        }else if(datosSesion.tipo == Usuario.tipos.usuario){
            iniciarSesionUsuario();
        }
    }
}

function iniciarSesionUsuario(){
    domDatoSesionUsuario.innerHTML = sesionController.getDatosSesion().usuario;
    verDomcontenedorSesionUsuario(true);
    verDomContenedorFormularioInicioSesion(false);

}

function iniciarSesionAdminstrador(){
    window.location.href="./paginas/admin.html";
}

function obtenerDatosSesionDeFormularioInicioSesion(){
    let usuario = domFormularioInicioSesion.usuario.value;
    let contrasenia = domFormularioInicioSesion.contrasenia.value;
    let tipo = domFormularioInicioSesion.tipo.options[domFormularioInicioSesion.tipo.selectedIndex].value;

    let datosSesion = new DatosSesion(usuario,contrasenia,tipo);
    return datosSesion;
    
}


function cerrarSesion(){
    sesionController.cerrarSesion();
    if(!sesionController.haySesionActiva()){
        domDatoSesionUsuario.innerHTML = "";
        verDomcontenedorSesionUsuario(false);
        verDomContenedorFormularioInicioSesion(true);
    }
}