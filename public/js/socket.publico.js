// Comando para establecer conexión con el servidor
var socket = io();

var tickets = $('.ticket');
var escritorios = $('.escritorio');

// Escucha los ultimos atendidos
socket.on('ultimos-atendidos', (data) => {

    for (var i in data.ultimos_atendidos) {

        var ticket = data.ultimos_atendidos[i];

        $(tickets[i]).text('Ticket ' + ticket.numero);
        $(escritorios[i]).text('Escritorio ' + ticket.escritorio);

    }

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();

});