const {Server} = require('ws');

const Connection = require('./connection');

class WSServer {
	constructor(port) {
		this.clients = {}
		this.wss = new Server({port});

		this.wss.on('connection', ((socket) => {
			console.log('Opened connection');

			let clientConnection = new Connection(this, socket); 
			this.clients[clientConnection.clientID] = clientConnection;
		}));
	}
}

module.exports = WSServer;