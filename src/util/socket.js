import io from 'socket.io-client';

export const socket = io.connect('http://localhost:3005');

socket.on('ping', () => {
	socket.emit('pong');
});

export const emitNotification = (userId, user) => {
	if (userId === user) return;

	socket.emit('notification received', userId);
};
