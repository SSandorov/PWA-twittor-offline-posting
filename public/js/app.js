var url = window.location.href;
var swLocation = '/twittor/sw.js';


if ( navigator.serviceWorker ) {


    if ( url.includes('localhost') ) {
        swLocation = '/sw.js';
    }


    navigator.serviceWorker.register( swLocation );
}

// Referencias de jQuery

var titulo      = $('#titulo');
var nuevoBtn    = $('#nuevo-btn');
var salirBtn    = $('#salir-btn');
var cancelarBtn = $('#cancel-btn');
var postBtn     = $('#post-btn');
var avatarSel   = $('#seleccion');
var timeline    = $('#timeline');

var modal       = $('#modal');
var modalAvatar = $('#modal-avatar');
var avatarBtns  = $('.seleccion-avatar');
var txtMensaje  = $('#txtMensaje');

// El usuario, contiene el ID del hÃ©roe seleccionado
var usuario;


// ===== Codigo de la aplicaciÃ³n

function crearMensajeHTML(mensaje, personaje) {

    var content =`
    <li class="animated fadeIn fast">
        <div class="avatar">
            <img src="img/avatars/${ personaje }.jpg">
        </div>
        <div class="bubble-container">
            <div class="bubble">
                <h3>@${ personaje }</h3>
                <br/>
                ${ mensaje }
            </div>
            
            <div class="arrow"></div>
        </div>
    </li>
    `;

    timeline.prepend(content);
    cancelarBtn.click();

}



// Globals
function logIn( ingreso ) {

    if ( ingreso ) {
        nuevoBtn.removeClass('oculto');
        salirBtn.removeClass('oculto');
        timeline.removeClass('oculto');
        avatarSel.addClass('oculto');
        modalAvatar.attr('src', 'img/avatars/' + usuario + '.jpg');
    } else {
        nuevoBtn.addClass('oculto');
        salirBtn.addClass('oculto');
        timeline.addClass('oculto');
        avatarSel.removeClass('oculto');

        titulo.text('Seleccione Personaje');
    
    }

}


// Seleccion de personaje
avatarBtns.on('click', function() {

    usuario = $(this).data('user');

    titulo.text('@' + usuario);

    logIn(true);

});

// Boton de salir
salirBtn.on('click', function() {

    logIn(false);

});

// Boton de nuevo mensaje
nuevoBtn.on('click', function() {

    modal.removeClass('oculto');
    modal.animate({ 
        marginTop: '-=1000px',
        opacity: 1
    }, 200 );

});

// Boton de cancelar mensaje
cancelarBtn.on('click', function() {
    if ( !modal.hasClass('oculto') ) {
        modal.animate({ 
            marginTop: '+=1000px',
            opacity: 0
         }, 200, function() {
             modal.addClass('oculto');
             txtMensaje.val('');
         });
    }
});

// Boton de enviar mensaje
postBtn.on('click', function() {

    var mensaje = txtMensaje.val();
    if ( mensaje.length === 0 ) {
        cancelarBtn.click();
        return;
    }

    var data = {
        mensaje: mensaje,
        user: usuario
    };

    // Manejo del envío de la petición POST
    fetch('api', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => console.log('app.js', res))
    .catch(err => console.log('app.js error: ', err));

    crearMensajeHTML( mensaje, usuario );

});

// Obtener mensajes del servidor
// Consumir los servicios REST
const mensajesUrl = 'api';

const getMensaje = () => {
    fetch('api')
    .then(resp => resp.json())
    .then(posts => {
        console.log(posts);
        // iteramos en el arreglo de elementos
        posts.forEach(post => {
            // añadimos la función que gestiona las imágenes
            crearMensajeHTML(post.mensaje, post.user);
        });
    })
    .catch(console.log);
}

getMensaje();

// Detectar cambios de conexión a internet
const isOnline = () => {
    if (navigator.onLine) {
        // tenemos conexión
        // console.log('online');
        const myToastOnline = mdtoast('Online', {
            interaction: true,
            interactionTimeout: 1000,
            actionText: 'OK!'
        });
        myToastOnline.show();
    } else {
        // no tenemos conexión
        // console.log('offline');
        const myToastOffline = mdtoast('Offline', {
            interaction: true,
            actionText: 'OK',
            type: 'warning'
        });

        myToastOffline.show();
    }
}
// debemos comprobar en el navegador cuando está conectado a internet o no
window.addEventListener('online', isOnline);
window.addEventListener('offline', isOnline);

// nos sale el mensaje desde que iniciamos la app
isOnline();