// Utilidades para grabar PouchDB

const db = new PouchDB('mensajes');

const guardarMensaje = (mensaje) => {
    mensaje._id = new Date().toISOString();
    db.put(mensaje)
    .then(() => {
        console.log('Mensaje guardado para el posteo futuro');
    });
}