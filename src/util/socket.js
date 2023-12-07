import io from 'socket.io-client';
let connected = false;

export const socket = io.connect('https://dosomething-backend.onrender.com');

socket.on('connected', () => {
	connected = true;
	console.log('You are connected!');
});

socket.on('joined', () => console.log('Joined successfully!'));
socket.on('typing', () => console.log('someone is typing'));
socket.on('message received', () => console.log("You've got mail"));
