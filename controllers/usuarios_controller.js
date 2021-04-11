const { response } = require("express");

const Usuario = require('../models/usuario_model');

const getUsuarios = async(req, res = response) => {
    try {
        const desde = Number(req.query.desde) || 0;
        const limit = Number(req.query.limit) || 20;
        const usuarios = await Usuario.find({ _id: {$ne: req.uid}})
            .sort('-online')
            .skip(desde)
            .limit(limit);
        res.json({
            ok: true,
            usuarios
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            error: error
        });
    }
}

module.exports = {
    getUsuarios
}