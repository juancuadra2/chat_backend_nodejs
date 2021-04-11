const Usuario = require('../models/usuario_model');
const Mensaje = require('../models/mensaje_model');

const estadoUsuario = async (uid = '', estado = false) =>  {
    const usuario = await Usuario.findByIdAndUpdate(uid, { online: estado });
    return usuario;
}

const guardarMensaje = async( data ) => {
    try {
        const mensaje = new Mensaje(data);
        await mensaje.save();
        return true;
    } catch (error) {
        return false;
    }
}


module.exports = {
    estadoUsuario,
    guardarMensaje,
}