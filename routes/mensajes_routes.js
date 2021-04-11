/*
 Path: /api/mensajes/
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jws');
const { obtenerChat } = require('../controllers/mensajes_controller');

const router = Router();

router.get('/:to', validarJWT, obtenerChat);

module.exports = router;