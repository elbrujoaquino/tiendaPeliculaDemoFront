import DatosSesion from "./DatosSesion.js";

class Usuario{
    static tipos = {administrador:"Administrador",usuario:"Usuario"};
    usuario;
    contrasenia;
    tipo;

    constructor(usuario,contrasenia,tipo){
        this.usuario=usuario;
        this.contrasenia=contrasenia;
        this.tipo=tipo;
    }

    getDatosSesion(){
        return new DatosSesion(this.usuario,this.contrasenia,this.tipo);
    }

}

export default Usuario;