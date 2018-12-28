const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // Escucha el evento de petición del siguiente ticket.
    client.on('siguiente-ticket', (data, callback) => {

        let ticket = ticketControl.siguiente_ticket();

        console.log(ticket);

        callback(ticket);

    });

    client.on('atender-ticket', (data, callback) => {

        if (!data.escritorio) {
            return callback({ ok: false, message: 'Es necesario indicar el escritorio' });
        }

        let ticket_atender = ticketControl.atender_ticket(data.escritorio);
        callback(ticket_atender);

        // actualizar/notificar cambios en los últimos tickets atendidos.
        // Emitir el evento para enviar los últimos tickets atendidos a la página publico.html.
        client.broadcast.emit('ultimos-atendidos', {
            ultimos_atendidos: ticketControl.get_ultimos_atendidos()
        });

    });

    // Emitir el evento para enviar el último ticket creado.
    client.emit('current-ticket', {
        current_ticket: ticketControl.get_current_ticket()
    });

    // Emitir el evento para enviar los últimos tickets atendidos.
    client.emit('ultimos-atendidos', {
        ultimos_atendidos: ticketControl.get_ultimos_atendidos()
    });

});