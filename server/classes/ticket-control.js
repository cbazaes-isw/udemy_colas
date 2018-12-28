const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos_atendidos = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {

            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos_atendidos = data.ultimos_atendidos;

        } else {

            this.reiniciar_conteo();

        }

    }

    siguiente_ticket() {

        this.ultimo++;
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabar_data();

        return `Ticket ${this.ultimo}`;

    }

    get_current_ticket() {

        return `Ticket ${this.ultimo}`;

    }

    atender_ticket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numero_ticket = this.tickets[0].numero;
        this.tickets.shift();

        let ticket_atendido = new Ticket(numero_ticket, escritorio);

        // Agregar el ticket_atendido al inicio del arreglo de los últimos atendidos.
        this.ultimos_atendidos.unshift(ticket_atendido);
        if (this.ultimos_atendidos.length > 4) {
            // Borro el último elemento del arreglo.
            this.ultimos_atendidos.splice(-1, 1);
        }

        this.grabar_data();
        return ticket_atendido;

    }

    get_ultimos_atendidos() {
        return this.ultimos_atendidos;
    }

    reiniciar_conteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimos_atendidos = [];

        console.log('Se ha reiniciado el conteo de tickets.');

        this.grabar_data();

    }

    grabar_data() {

        let json_data = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos_atendidos: this.ultimos_atendidos
        };

        let json_data_string = JSON.stringify(json_data);
        fs.writeFileSync('./server/data/data.json', json_data_string);

    }

}

module.exports = {
    TicketControl
}