// Comando para establecer conexión con el servidor
var socket = io();

var label_ticket = $('#lblNuevoTicket');

// Escucha la conexión al servidor
socket.on('connect', () => {

    console.log('Conectado al servidor');

});

// Escucha la desconexión al servidor
socket.on('disconnect', () => {

    console.log('Perdimos conexión con el servidor');

});

// Escucha el ticket de la primera carga de la página
socket.on('current-ticket', (data) => {

    label_ticket.text(data.current_ticket);

});

// Escucha el evento click de cualquier botón.
$('button').on('click', () => {

    // Emite un mensaje al servidor para que responda con el siguiente ticket.
    socket.emit('siguiente-ticket', null, (siguiente_ticket) => {

        label_ticket.text(siguiente_ticket);

    });

});