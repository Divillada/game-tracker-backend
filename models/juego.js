const mongoose = require('mongoose');

const JuegoSchema = new mongoose.Schema({
  nombre: { 
    type: String, 
    required: [true, 'El nombre del juego es obligatorio'],
    trim: true,
    unique: true
  },

  plataforma: {
    type: String,
    required: [true, 'La plataforma es obligatoria']
  },

  portadaURL: {
    type: String, 
    required: false
  },

  estado: {
    type: String,
    enum: ['Por jugar', 'Jugando', 'Completado', 'Abandonado'],
    default: 'Por jugar'
  },

  horasJugadas: { 
    type: Number, 
    default: 0,
    min: 0
  },

  completado: { 
    type: Boolean, 
    default: false 
  },
  
  estrellas: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  
  // Guardar referencias a reseñas en otra colección (models/resena.js)
  resenas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resena' }]
}, { timestamps: true });

module.exports = mongoose.model('Juego', JuegoSchema);

