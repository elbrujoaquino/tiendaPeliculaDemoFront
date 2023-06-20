import SesionDAO from "../Model/SesionDAO.js";
import UsuarioDAO from "../Model/UsuarioDAO.js";

class SesionController{

    sesionDAO;
    usuarioDAO;

    constructor(){
        this.sesionDAO= new SesionDAO;
        this.usuarioDAO = new UsuarioDAO;
    }


    setSesion(datosSesion){
        this.sesionDAO.setSesion(datosSesion);
    }

    getDatosSesion(){
        return this.sesionDAO.getDatosSesion();
    }

    haySesionActiva(){
        return this.sesionDAO.getDatosSesion() != null;
    }

    iniciarSesion(datosSesionProcesados){
        if(this.autentificar(datosSesionProcesados)){
            this.sesionDAO.iniciarSesion(datosSesionProcesados);
            return true;
        }else{
            return false;
        }

    }

    cerrarSesion(){
        this.sesionDAO.cerrarSesion();
    }

    autentificar(datosSesionProcesados){
        let usuarioGuardado=  this.usuarioDAO.obtenerUsuarioByUsuarioName(datosSesionProcesados.usuario);
        if(usuarioGuardado != null){
            return usuarioGuardado.getDatosSesion().es(datosSesionProcesados);
        }else{
            return false;
        }
       
    }
}

export default SesionController;