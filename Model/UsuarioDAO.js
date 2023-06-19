import Usuario from "./Usuario.js";


class UsuarioDAO{
    localStorage;
    identificador;

    constructor(){
        this.localStorage= window.localStorage;
        this.identificador="usuarios";
        if(JSON.parse(this.localStorage.getItem(this.identificador)) ==null){
            this.localStorage.setItem(this.identificador,JSON.stringify([]));
        }
    }

    obtenerUsuarioByUsuarioName(usuarioName){
        let usuarios = this.obtenerUsuarios();
        let indiceUsuario =this.obtenerIndiceUsuarioByUsuarioName(usuarioName);
        if(indiceUsuario != null){
            return usuarios[indiceUsuario];
        }else{
            return null;
        }
        
     }

     obtenerUsuarios() {
        let datosUsuarios = JSON.parse(this.localStorage.getItem(this.identificador));
        let usuarios=[];
        datosUsuarios.forEach(datosUsuario => {
            usuarios.push(new Usuario(datosUsuario.usuario,datosUsuario.contrasenia,datosUsuario.tipo));
        });
        return usuarios;

     }

    agregarUsuario(usuarioProcesado){
        let usuarios = this.obtenerUsuarios();
        if(!this.existeUsuario(usuarioProcesado)){
            usuarios.push(usuarioProcesado);
            this.actualizarUsuarios(usuarios);
            return "guardado";
        }else{
            return "duplicado";
        }

    }

    eliminarUsuario(usuarioProcesado){
        let usuarios = this.obtenerUsuarios();
        let indicieUsuario = this.obtenerIndiceUsuarioByUsuario(usuarioProcesado);
        if(indicieUsuario != null){
            usuarios.splice(indicieUsuario,1);
            this.actualizarUsuarios(usuarios);
            return "eliminado";
        }else{
            return'noExiste'
        }
    }

    modificarUsuario(usuarioProcesado,usuarioName){
        let usuarios = this.obtenerUsuarios();
        let indicieUsuario = this.obtenerIndiceUsuarioByUsuarioName(usuarioName);
        if(indicieUsuario != null){
            usuarios.splice(indicieUsuario,1,usuarioProcesado);
            this.actualizarUsuarios(usuarios);
            return "actualizado";
        }else{
            return'noExiste'
        }
    }

    actualizarUsuarios(usuarios){
        this.localStorage.setItem(this.identificador,JSON.stringify(usuarios));
    }

    obtenerIndiceUsuarioByUsuario(usuarioProcesado){
        let usuarios = this.obtenerUsuarios();
        let indicieUsuario = usuarios.findIndex(usuario => usuario.usuario == usuarioProcesado.usuario);
        return indicieUsuario != -1 ? indicieUsuario : null;
    }

    obtenerIndiceUsuarioByUsuarioName(usuarioName){
        let usuarios = this.obtenerUsuarios();
        let indicieUsuario = usuarios.findIndex(usuario =>  usuario.usuario == usuarioName);
        return indicieUsuario != -1 ? indicieUsuario : null;
    }

    existeUsuario(usuarioProcesado){
        let usuarios = this.obtenerUsuarios();
        let indicieUsuario = usuarios.findIndex(usuario => usuario.usuario == usuarioProcesado.usuario);
        return indicieUsuario != -1;
    }


}

export default UsuarioDAO;