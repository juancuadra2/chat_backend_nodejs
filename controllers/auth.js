const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario_model');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }
        const usuario = new Usuario(req.body);
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            error: error
        });
    }
}

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ email });
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Correo o contraseña incorrecto'
            });
        }

        const validador = bcrypt.compareSync(password, usuario.password);
        if (!validador) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo o contraseña incorrecto'
            });
        }

        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            error: error
        });
    }
}

const renovarJWT = async(req, res = response) => {
    const uid = req.uid;
    try {
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            error: error
        });
    }
}

module.exports = {
    crearUsuario,
    login,
    renovarJWT,
}