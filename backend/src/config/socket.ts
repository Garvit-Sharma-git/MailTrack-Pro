import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';


let io: SocketIOServer | null = null;


export const initSocket = (server: HttpServer) => {
io = new SocketIOServer(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
console.log('Socket connected', socket.id);
// optionally authenticate socket here
});
};


export const getIo = () => {
if (!io) throw new Error('Socket not initialized');
return io;
};