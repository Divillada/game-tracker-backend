const Resena = require('../models/resena');

// C - Crear reseña
exports.crearResena = async (req, res) => {
  try {
    const nuevaResena = new Resena(req.body);
    await nuevaResena.save();
    res.status(201).json(nuevaResena);
  } catch (error) {
    res.status(400).json({
      error: 'Error al crear la reseña',
      details: error.message
    });
  }
};

// R - Obtener reseñas 
exports.obtenerResenas = async (req, res) => {
  try {
       // Permite filtrar reseñas por el ID del juego enviado en el query (Explicacion propia para repasar)
    const filtro = req.query.juegoId ? { juego: req.query.juegoId } : {};
        // .populate('juego', 'nombre') trae el nombre del juego relacionado
    const resenas = await Resena.find(filtro).populate('juego', 'nombre');
    res.status(200).json(resenas);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener las reseñas',
      details: error.message
    });
  }
};

// R - Obtener reseña por ID
exports.obtenerResenaPorId = async (req, res) => {
    try {
        const resena = await Resena.findById(req.params.id).populate('juego', 'nombre');

        if (!resena) {
            return res.status(404).json({ error: 'Reseña no encontrada' });
        }    

        res.status(200).json(resena);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error al buscar la reseña',
            details: error.message
        });
    }
}

// U - Actualizar reseña
exports.actualizarResena = async (req, res) => {
  try {
    const resenaActualizada = await Resena.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!resenaActualizada) 
        return res.status(404).json({ error: 'Reseña no encontrada para actualizar' });
    res.status(200).json(resenaActualizada);
  } catch (error) {
    res.status(400).json({
      error: 'Error al actualizar la reseña',
      details: error.message
    });
  }
};

// D - Eliminar reseña
exports.eliminarResena = async (req, res) => {
  try {
    const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
    if (!resenaEliminada) 
        return res.status(404).json({ error: 'Reseña no encontrada para eliminar' });
    res.status(200).json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar la reseña',
      details: error.message
    });
  }
};
