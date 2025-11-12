const Juego = require('../models/juego');

// Casos Exitosos
// 201 = A cuando se creo correctamnete
// 200 = El resultado solicitado fue exitoso

// Casos de Error
// 400 = Datos son invalidos (CLIENTE O USUARIO)
// 404 = Recurso es inexistente
// 500 = Error del servidor propio


// c - Crear JUEGO
exports.crearJuego = async (req, res) => {
    try {
        const nuevoJuego = new Juego(req.body);
        await nuevoJuego.save();
        res.status(201).json(nuevoJuego);
    } catch (error) {
        res.status(400).json({ 
            error: 'Error al crear el juego. Verifique campos', 
            details: error.message
        });
    }
}

// R Obtener Datos
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.find();
        res.status(200).json(juegos);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error interno del servidor al obtener los juegos',
        });
    }
}

//R Obtener datos por id JUEGO
exports.obtenerJuegoPorId = async (req, res) => {
    try {
        const juegoEncontrado = await Juego.findById(req.params.id);

        if (!juegoEncontrado) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }    

        res.status(200).json(juegoEncontrado);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al buscar juego', 
        });
    }
}

// U Actualizar 
exports.actualizarJuego = async (req, res) => {
    try {
        const juegoActualizado = await Juego.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        if (!juegoActualizado) {
            return res.status(404).json({ error: 'Juego no encontrado para actualizar' });
        }
        res.status(200).json(juegoActualizado);
    } catch (error) {
        res.status(400).json({
            error: 'Error al actualizar el juego',
            details: error.message
        });
    }
}

//D Eliminar
exports.eliminarJuego = async (req, res) => {
    try {
        const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);

        if (!juegoEliminado) {
            return res.status(404).json({ error: 'Juego no encontrado para eliminar' });
        }

        res.status(200).json({ message: 'Juego eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al eliminar el juego', 
        });
    }
}