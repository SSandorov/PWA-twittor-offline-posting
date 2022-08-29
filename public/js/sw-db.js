// Utilidades para grabar PouchDB

const db = new PouchDB('mensajes');

const guardarMensaje = (mensaje) => {
    mensaje._id = new Date().toISOString();
    return db.put(mensaje)
    .then(() => {
        // console.log('Mensaje guardado para el posteo futuro');
        self.registration.sync.register('nuevo-post');

        const newResp = {ok: true, offline:true};

        return new Response(JSON.stringify(newResp));
    });
}