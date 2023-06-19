import Usuario from "./Usuario.js";
import UsuarioDAO from "./UsuarioDAO.js";

function cargarDatosPrueba(){
    let usuarioDAO = new UsuarioDAO;
    usuarioDAO.agregarUsuario(new Usuario("Pedro","Pedro1234",Usuario.tipos.administrador));
    usuarioDAO.agregarUsuario(new Usuario("Juan","Juan1234",Usuario.tipos.usuario));
}

export default cargarDatosPrueba;