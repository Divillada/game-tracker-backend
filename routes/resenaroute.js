const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const juegocontroller = require('../controllers/juegocontroller');

// Rutas CRUD para Juegos (Endpoint: /api/juegos
router.post('/', juegocontroller.crearJuego);
router.get('/', juegocontroller.obtenerJuegos);
router.get('/:id', juegocontroller.obtenerJuegoPorId);
router.put('/:id', juegocontroller.actualizarJuego);
router.delete('/:id', juegocontroller.eliminarJuego);

module.exports = router;