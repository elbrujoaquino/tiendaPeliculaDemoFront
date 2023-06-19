class DatosSesion{
    usuario;
    contrasenia;
    tipo;

    constructor(usuario,contrasenia,tipo){
        this.usuario=usuario;
        this.contrasenia=contrasenia;
        this.tipo=tipo;
    }

    es(datosSesion){ 
        if(this.usuario==datosSesion.usuario && this.contrasenia == datosSesion.contrasenia && this.tipo == datosSesion.tipo){
            return true;
        }else{
            return false;
        }
    }
}


export default DatosSesion;
