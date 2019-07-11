const shortid = require('shortid');

class Connection {
	constructor(server, socket) {
		this.server = server;
		this.socket = socket;
		this.clientID = shortid.generate();

		socket.on('message', this.onMessage.bind(this));
		socket.on('close', this.onClose.bind(this));
	}

	onMessage(message) {
		for (let clientID in this.server.clients) {
			let client = this.server.clients[clientID];
			if (client.clientID != this.clientID) {
				client.socket.send(message);
			}
		}
	}

	onClose() {
		delete this.server.clients[this.clientID];
		console.log('connection closed');
	}
}

module.exports = Connection;