import ABMCPeliculaController from "./Controller/ABMCPeliculaController.js";
import DatosSesion from "./Model/DatosSesion.js";

let aBMCPeliculaController = new ABMCPeliculaController();
let domFormularioInicioSesion;


window.onload = ()=>{
    domFormularioInicioSesion = document.querySelector("#formularioInicioSesion");
    
    agregarEventoFormularioInicioSesion();
    console.log(domFormularioInicioSesion);

    mostrarPeliculas();
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
}


function iniciarSesion(){
    let datosSesion = obtenerDatosSesionDeFormularioInicioSesion();
    console.log(datosSesion);
}

function obtenerDatosSesionDeFormularioInicioSesion(){
    let usuario = domFormularioInicioSesion.usuario.value;
    let contrasenia = domFormularioInicioSesion.contrasenia.value;
    let tipo = domFormularioInicioSesion.tipo.options[domFormularioInicioSesion.tipo.selectedIndex].value;

    let datosSesion = new DatosSesion(usuario,contrasenia,tipo);
    return datosSesion;
    
}
