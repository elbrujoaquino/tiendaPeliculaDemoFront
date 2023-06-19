import DatosSesion from "./DatosSesion.js";

class SesionDAO{
    localStorage;
    identificador;

    constructor(){
        this.localStorage= window.localStorage;
        this.identificador="usuarioActivo";
        if(JSON.parse(this.localStorage.getItem(this.identificador)) ==null){
            this.localStorage.setItem(this.identificador,JSON.stringify(null));
        }
    }

    setSesion(datosSesionProcesados){
        this.localStorage.setItem(this.identificador,JSON.stringify(datosSesionProcesados));
    }

    getDatosSesion(){
        let datosSesionData = JSON.parse(this.localStorage.getItem(this.identificador));
        return  new DatosSesion(datosSesionData.usuario,datosSesionData.contrasenia,datosSesionData.tipo);
    }

}

export default SesionDAO;