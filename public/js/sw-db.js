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

// Postear mensajes a la API
const postearMensajes = () => {
    const posteos = [];

    return db.allDocs({include_docs: true})
    .then(docs => {
        docs.rows.forEach(row => {
            const doc = row.doc;

            const fetchProm = fetch('api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(doc)
                })
                .then(res => {
                    return db.remove(doc);
                });
            posteos.push(fetchProm);
        });
        return Promise.all(posteos);
    });
};