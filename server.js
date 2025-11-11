//IMPORTACION DE LA BIBLIOTECA Y CREACION DE CONSTANTES
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

//CONEXION CON LA BD
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Conexion exitosa a MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error de conexion', error.message);
        process.exit(1);
    });

//RUTAS 
const juegoroutes = require('./routes/juegoroute');
app.use('/api/juegos', juegoroutes);

const resenasroutes = require('./routes/resenaroute');
app.use('/api/resenas', resenasroutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});