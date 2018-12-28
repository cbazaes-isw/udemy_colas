// Comando para establecer conexión con el servidor
var socket = io();

var search_params = new URLSearchParams(window.location.search);

if (!search_params.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = search_params.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atender-ticket', { escritorio: escritorio }, function(respuesta) {

        if (respuesta == 'No hay tickets') {
            $('small').text(respuesta);
            return;
        }

        $('small').text('Ticket ' + respuesta.numero);

    });

});