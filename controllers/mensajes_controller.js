const { response } = require("express");
const Mensaje = require("../models/mensaje_model")

const obtenerChat = async (req, res = response) => {
    const miUid = req.uid;
    const usuarioTo = req.params.to;

    const mensajes =  await Mensaje.find({
        $or: [
            { from: miUid, to: usuarioTo }, 
            { from: usuarioTo, to: miUid }
        ]
    })
    .sort({ createdAt: 'desc'});

    res.json({
        ok: true,
        mensajes
    });
}

module.exports = {
    obtenerChat,
}