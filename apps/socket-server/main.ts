import { Server } from 'socket.io';
import { createServer } from 'http';
import { chatEvents } from './events/chat.events';

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.SOCKET_PORT || 4001;

// Register chat events
chatEvents(io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Socket Server running on port ${PORT}`);
});
