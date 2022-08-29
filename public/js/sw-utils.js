

// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {


    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }

}

// Cache with network update
function actualizaCacheStatico( staticCache, req, APP_SHELL_INMUTABLE ) {


    if ( APP_SHELL_INMUTABLE.includes(req.url) ) {
        // No hace falta actualizar el inmutable
        // console.log('existe en inmutable', req.url );

    } else {
        // console.log('actualizando', req.url );
        return fetch( req )
                .then( res => {
                    return actualizaCacheDinamico( staticCache, req, res );
                });
    }

}

// Network with cache fallback / update
function manejoApiMensajes(cacheName, req) {

    if (req.clone().method === 'POST') {
        // Postear un nuevo mensaje

        // tengo que almacenar la petición POST en el indexed db
        return fetch(req);
    } else {
        return fetch(req)
        .then(res => {
            if(res.ok) {
                actualizaCacheDinamico(cacheName, req, res.clone());
                return res.clone();
            } else {
                return caches.match(req);
            }
        })
        // En caso de que no hubiese conexión a internet nos daría un error, por lo que
        // debemos manejar esta situación con un catch
        .catch(err => {
            return caches.match(req);
        });
    }
    
}
