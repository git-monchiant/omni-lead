import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

// Check if we should enable socket (only if VITE_SOCKET_URL is set and not 'disabled')
const ENABLE_SOCKET = import.meta.env.VITE_SOCKET_URL &&
                      import.meta.env.VITE_SOCKET_URL !== 'disabled';

export function useSocket(url: string = 'http://localhost:4001') {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Skip socket connection if disabled (for standalone/mockup mode)
    if (!ENABLE_SOCKET) {
      console.log('Socket disabled - running in standalone mode');
      return;
    }

    const socketInstance = io(url, {
      autoConnect: false,
      reconnection: false, // Disable auto-reconnect for mockup mode
    });

    // Try to connect
    socketInstance.connect();

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    socketInstance.on('connect_error', (error) => {
      console.log('Socket connection failed - running in standalone mode', error.message);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [url]);

  return { socket, isConnected };
}
