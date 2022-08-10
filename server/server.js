const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 8080;

// Manejo de las subidas de los mensajes al servidor
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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