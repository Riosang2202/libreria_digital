const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Ruta principal - DEBE IR ANTES del static
app.get('/', (req, res) => {
    res.send('Libreria chaquetona ');
});

// Archivos estáticos - DESPUÉS de las rutas específicas
app.use(express.static('../frontend'));

// Cargar datos de libros
const cargarLibros = () => {
    const rutaLibros = path.join(__dirname, 'datos', 'libros.json');
    const datos = fs.readFileSync(rutaLibros, 'utf8');
    return JSON.parse(datos);
};

// Ruta de libros
app.get('/libros', (req, res) => {
    const libros = cargarLibros();
    res.json(libros);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(` Servidor corriendo en: http://localhost:${PORT}`);
});