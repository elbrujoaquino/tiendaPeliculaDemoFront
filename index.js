import ABMCPeliculaController from "./Controller/ABMCPeliculaController.js";
import CarritoController from "./Controller/CarritoController.js";
import SesionController from "./Controller/SesionController.js";
import DatosSesion from "./Model/DatosSesion.js";
import Pelicula from "./Model/Pelicula.js";
import Usuario from "./Model/Usuario.js";
import cargarDatosPrueba from "./Model/datosPrueba.js"

let aBMCPeliculaController = new ABMCPeliculaController();
let sesionController = new SesionController();
let carritoController = new CarritoController();
let domFormularioInicioSesion;
let domBotonCerrarSesion;
let domContenedorFormularioInicioSesion;
let domcontenedorSesionUsuario;
let domDatoSesionUsuario;
let domListaPeliculas;
let domDetallePelicula;
let domEntradaFiltroPelicula;
let domCantidadElementosCarrito;
let domListaItemCarrito;
let domCabezeraListaItemCarrito;


window.onload = ()=>{
    domFormularioInicioSesion = document.querySelector("#formularioInicioSesion");
    domBotonCerrarSesion = document.querySelector("#botonCerrarSesion");
    domContenedorFormularioInicioSesion = document.querySelector("#contenedorFormularioInicioSesion");
    domcontenedorSesionUsuario = document.querySelector("#contenedorSesionUsuario");
    domDatoSesionUsuario = document.querySelector("#datoSesionUsuario");
    domListaPeliculas = document.querySelector("#listaPeliculas");
    domDetallePelicula = document.querySelector("#detallePelicula");
    domEntradaFiltroPelicula = document.querySelector("#entradaFiltroPelicula");
    domCantidadElementosCarrito = document.querySelector("#cantidadElementosCarrito");
    domListaItemCarrito = document.querySelector("#listaItemCarrito");
    domCabezeraListaItemCarrito = document.querySelector("#cabezeraListaItemCarrito");

    cargarDatosPrueba();
    agregarEventoFormularioInicioSesion();
    agregarEventoBotonCerrarSesion();
    agregarEventoFiltrarPelicula();

    verificarSesion();
    mostrarPeliculas();
    mostrarCarrito();
    mostrarPeliculaSeleccionada(aBMCPeliculaController.obtenerPeliculas()[2]);
}

function mostrarCarrito(){
    let carrito  = carritoController.obtener();
    domCantidadElementosCarrito.innerHTML=carrito.length;
    domListaItemCarrito.innerHTML="";
    domCabezeraListaItemCarrito.innerHTML = "";
    if(carrito.length > 0){
        domCabezeraListaItemCarrito.innerHTML = /* html */`
            <tr>
                <td>Nombre</td>
                <td>Precio</td>     
            </tr>
        `;
    }
    carrito.forEach((itemCarriro,inidice)=>{

        let tr = document.createElement("tr");
        domListaItemCarrito.appendChild(tr);

        tr.innerHTML += /* html */`
                <td>${itemCarriro.nombrePelicula}</td>
                <td>$${itemCarriro.precio}</td>
        `;

       
        let tdRemove = document.createElement("td");
        let botonRemove = document.createElement("img");
        tr.appendChild(tdRemove);
        botonRemove.src = "./imagenes/remover.svg";
        tdRemove.appendChild(botonRemove);
        botonRemove.onclick = ()=>{
            quitarDelCarrito(inidice);
        }

        
    });
}

function agregarAlcarrito(pelicula){
   
    carritoController.agregaPelicula(pelicula);
    mostrarCarrito();
}

function quitarDelCarrito(indice){
    console.log(indice);
    carritoController.quitarPelicula(indice);
    mostrarCarrito();
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
        domcontenedorSesionUsuario.classList.remove("ocultar");
    }else{
        domcontenedorSesionUsuario.classList.add("ocultar");
    }
}

function agregarEventoBotonCerrarSesion(){
    domBotonCerrarSesion.onclick = ()=>{
        cerrarSesion();
    }
}

function agregarEventoFiltrarPelicula(){
    domEntradaFiltroPelicula.onkeyup = ()=>{
        mostrarPeliculas(domEntradaFiltroPelicula.value);
    }
}


function agregarEventoFormularioInicioSesion(){
    domFormularioInicioSesion.onsubmit = ()=>{
        event.preventDefault();
        iniciarSesion()
    }
}




function mostrarPeliculas(nombrePelicula=null){
    let peliculasMostrar;
    if(nombrePelicula==null){
        peliculasMostrar = aBMCPeliculaController.obtenerPeliculas();
    }else{
        peliculasMostrar= aBMCPeliculaController.obtenerPeliculasFiltrado(nombrePelicula);
    }
    domListaPeliculas.innerHTML="";
    peliculasMostrar.forEach((pelicula)=>{
       let figure = document.createElement("figure");
       figure.className="pelicula";
       figure.innerHTML = /* html */ `
        <img src="${pelicula.imagen}" alt="">
        <figcaption>${pelicula.nombre}</figcaption>
       `;
       figure.onclick = ()=>{
        mostrarPeliculaSeleccionada(pelicula);
       }
       domListaPeliculas.appendChild(figure);

    });

}

function mostrarPeliculaSeleccionada(pelicula){
    domDetallePelicula.querySelector("#trailerPelicula").src = pelicula.getEmbedTriler();
    domDetallePelicula.style.backgroundImage= `url(${pelicula.imagen})`;
    domDetallePelicula.querySelector("#fechaLanzamiento").innerHTML="Estreno: "+ pelicula.fechaEsteno;
    domDetallePelicula.querySelector("#duracion").innerHTML="Duración: "+ pelicula.duracion;
    domDetallePelicula.querySelector("#genero").innerHTML="Genero: "+  pelicula.genero;
    domDetallePelicula.querySelector("#sinopsis").innerHTML="Sinopsis: "+  pelicula.sinopsis;
    domDetallePelicula.querySelector("#precio").innerHTML="$"+  pelicula.precio;
    domDetallePelicula.querySelector("#agregarCarrito").onclick = ()=>{
        agregarAlcarrito(pelicula);
    }
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