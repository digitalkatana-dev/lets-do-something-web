import io from 'socket.io-client';

export const socket = io.connect('https://dosomething-backend.onrender.com');

socket.on('connected', () => {
	console.log('You are connected!');
});

socket.on('reconnected', () => {
	console.log('You are reconnected!');
});

socket.on('ping', () => {
	console.log('Ping!');
	socket.emit('pong');
});

socket.on('joined', () => console.log('Joined successfully!'));
socket.on('typing', () => console.log('someone is typing'));
socket.on('message received', () => console.log("You've got mail"));

export const emitNotification = (userId, user) => {
	if (userId === user) return;

	socket.emit('notification received', userId);
};
