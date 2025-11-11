const mongoose = require('mongoose');
const { Schema } = mongoose;

const ResenaSchema = new Schema({
  juego: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Juego',
    required: [true, 'El ID del juego es obligatorio']
  },
  autor: { 
    type: String, 
    default: 'Anónimo' 
  },
  texto: { 
    type: String, 
    required: [true, 'El texto de la reseña es obligatorio'] 
  },
  estrellas: { 
    type: Number, 
    min: 0, 
    max: 5, 
    default: 0 
  },
  fecha: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

module.exports = mongoose.model('Resena', ResenaSchema);
