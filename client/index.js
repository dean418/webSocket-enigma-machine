import {WSClient} from './WSClient.mjs';

let client = new WSClient();

let input = document.getElementById('input');
let btn = document.getElementById('btn');

function send() {
	let message = input.value;
	client.sendMessage(message)
}

btn.onclick = send;

// window.addEventListener('beforeunload', function() {
//   socket.close();
// });