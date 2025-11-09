import { Server, Socket } from 'socket.io';

export function chatEvents(io: Server) {
  io.on('connection', (socket: Socket) => {

    // Join a lead's chat room
    socket.on('join-lead-chat', (leadId: string) => {
      socket.join(`lead-${leadId}`);
      console.log(`Socket ${socket.id} joined lead-${leadId}`);
    });

    // Leave a lead's chat room
    socket.on('leave-lead-chat', (leadId: string) => {
      socket.leave(`lead-${leadId}`);
      console.log(`Socket ${socket.id} left lead-${leadId}`);
    });

    // Send message to a lead's chat room
    socket.on('send-message', (data: { leadId: string; message: string; sender: string }) => {
      const { leadId, message, sender } = data;

      // Broadcast to all clients in the lead's room
      io.to(`lead-${leadId}`).emit('new-message', {
        leadId,
        message,
        sender,
        timestamp: new Date().toISOString()
      });

      console.log(`Message sent to lead-${leadId} from ${sender}`);
    });

    // Typing indicator
    socket.on('typing', (data: { leadId: string; user: string }) => {
      const { leadId, user } = data;
      socket.to(`lead-${leadId}`).emit('user-typing', { leadId, user });
    });

    // Stop typing indicator
    socket.on('stop-typing', (data: { leadId: string; user: string }) => {
      const { leadId, user } = data;
      socket.to(`lead-${leadId}`).emit('user-stop-typing', { leadId, user });
    });
  });
}
