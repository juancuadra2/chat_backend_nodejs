const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios_controller');
const { validarJWT } = require('../middlewares/validar-jws');

const router = Router();

router.get('/', validarJWT, getUsuarios);

module.exports = router;

