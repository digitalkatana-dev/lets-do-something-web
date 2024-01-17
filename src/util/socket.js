import io from 'socket.io-client';

export const socket = io.connect('https://dosomething-backend.onrender.com');

socket.on('ping', () => {
	socket.emit('pong');
});

export const emitNotification = (userId, user) => {
	if (userId === user) return;

	socket.emit('notification received', userId);
};
