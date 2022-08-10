// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

// Arreglo de mensajes
const mensajes = [
  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  },
  {
    _id: 'XX1',
    user: 'ironman',
    mensaje: 'Hola Mundo'
  }
];

// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  // Para obtener los mensajes escribimos lo siguiente
  res.json(mensajes);
});

// Post mensajes
router.post('/', function (req, res) {
  const mensaje = {
    // el body nos lo maneja el body parser
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  // añadimos el mensaje al arreglo de mensajes
  mensajes.push(mensaje);

  res.json({
    ok: true,
    mensaje
  });
});

module.exports = router;