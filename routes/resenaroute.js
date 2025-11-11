const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const resenacontroller = require('../controllers/resenacontroller');

// Rutas CRUD para Reseñas
router.post('/', resenacontroller.crearResena);
router.get('/', resenacontroller.obtenerResenas);
router.get('/:id', resenacontroller.obtenerResenaPorId);
router.put('/:id', resenacontroller.actualizarResena);
router.delete('/:id', resenacontroller.eliminarResena);

module.exports = router;