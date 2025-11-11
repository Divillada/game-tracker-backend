require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const cors = require('cors');
app.use(cors());

app.use(express.json());

// Validar variable de entorno
if (!MONGO_URL) {
  console.error('Error: MONGO_URL no está definido en .env');
  process.exit(1);
}

// CONEXIÓN CON LA BD
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Conexión exitosa a MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error de conexión', error.message);
        process.exit(1);
    });

// RUTAS (nombres de archivo correctos)
const juegoroutes = require('./routes/juegoroute');
app.use('/api/juegos', juegoroutes);

const resenasroutes = require('./routes/resenaroute');
app.use('/api/resenas', resenasroutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});