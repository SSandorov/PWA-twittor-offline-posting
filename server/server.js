const express = require('express');

const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 8080;


// Directorio Público
app.use(express.static(publicPath));

// Rutas 
// se accede a todo lo que tenemos en el routes.js a través de la ruta /api
const routes = require('./routes');
app.use('/api', routes );



app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});