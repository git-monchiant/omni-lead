import React, { useState, useEffect, useRef } from 'react';
import { Lead, ChatMessage } from '../types';
import { Socket } from 'socket.io-client';
import { mockChatMessages } from '../data/mockData';

interface ChatPanelProps {
  lead: Lead;
  socket: Socket | null;
}

export default function ChatPanel({ lead, socket }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages for selected lead
    const leadMessages = mockChatMessages[lead.id] || [];
    setMessages(leadMessages);
  }, [lead.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('new-message', (data: ChatMessage) => {
      if (data.leadId === lead.id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    // Listen for typing indicator
    socket.on('user-typing', (data: { leadId: string; user: string }) => {
      if (data.leadId === lead.id) {
        setIsTyping(true);
      }
    });

    socket.on('user-stop-typing', (data: { leadId: string; user: string }) => {
      if (data.leadId === lead.id) {
        setIsTyping(false);
      }
    });

    return () => {
      socket.off('new-message');
      socket.off('user-typing');
      socket.off('user-stop-typing');
    };
  }, [socket, lead.id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socket) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      leadId: lead.id,
      message: newMessage,
      sender: 'agent',
      createdAt: new Date().toISOString(),
    };

    // Send via socket
    socket.emit('send-message', {
      leadId: lead.id,
      message: newMessage,
      sender: 'agent',
    });

    // Add to local state
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPlatformIcon = (platform?: string) => {
    const icons = {
      line: '💚',
      facebook: '💙',
      web: '🌐',
    };
    return icons[platform as keyof typeof icons] || '💬';
  };

  return (
    <div className="chat-panel">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-chat">
            <p>ยังไม่มีข้อความ</p>
            <p className="empty-chat-subtitle">เริ่มต้นการสนทนากับ {lead.name}</p>
          </div>
        ) : (
          <>
            {messages.map((msg, index) => {
              const showDate = index === 0 ||
                formatDate(messages[index - 1].createdAt) !== formatDate(msg.createdAt);

              return (
                <React.Fragment key={msg.id}>
                  {showDate && (
                    <div className="date-divider">
                      <span>{formatDate(msg.createdAt)}</span>
                    </div>
                  )}
                  <div className={`message ${msg.sender === 'agent' ? 'sent' : 'received'}`}>
                    <div className="message-content">
                      {msg.platform && msg.sender === 'lead' && (
                        <span className="platform-badge">
                          {getPlatformIcon(msg.platform)} {msg.platform}
                        </span>
                      )}
                      <p className="message-text">{msg.message}</p>
                      <span className="message-time">{formatTime(msg.createdAt)}</span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <form onSubmit={handleSendMessage} className="message-input-container">
        <input
          type="text"
          placeholder="พิมพ์ข้อความ..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button" disabled={!newMessage.trim()}>
          <span>ส่ง</span>
          <span className="send-icon">📤</span>
        </button>
      </form>

      <style jsx>{`
        .chat-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f9fafb;
        }

        .messages-container {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .empty-chat {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #9ca3af;
        }

        .empty-chat p {
          margin: 0.25rem 0;
        }

        .empty-chat-subtitle {
          font-size: 0.875rem;
        }

        .date-divider {
          text-align: center;
          margin: 1.5rem 0 1rem 0;
        }

        .date-divider span {
          background: #e5e7eb;
          padding: 0.25rem 1rem;
          border-radius: 12px;
          font-size: 0.75rem;
          color: #6b7280;
        }

        .message {
          display: flex;
          margin-bottom: 1rem;
        }

        .message.sent {
          justify-content: flex-end;
        }

        .message.received {
          justify-content: flex-start;
        }

        .message-content {
          max-width: 70%;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          position: relative;
        }

        .message.sent .message-content {
          background: #3b82f6;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message.received .message-content {
          background: white;
          color: #1f2937;
          border-bottom-left-radius: 4px;
          border: 1px solid #e5e7eb;
        }

        .platform-badge {
          display: inline-block;
          font-size: 0.7rem;
          background: #f3f4f6;
          color: #6b7280;
          padding: 0.2rem 0.5rem;
          border-radius: 6px;
          margin-bottom: 0.5rem;
        }

        .message-text {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .message-time {
          display: block;
          font-size: 0.7rem;
          margin-top: 0.5rem;
          opacity: 0.7;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 0.75rem 1rem;
          background: white;
          border-radius: 12px;
          width: fit-content;
          margin-bottom: 1rem;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          background: #9ca3af;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-10px);
          }
        }

        .message-input-container {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: white;
          border-top: 1px solid #e5e7eb;
        }

        .message-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          font-size: 0.9375rem;
          outline: none;
        }

        .message-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .send-button {
          padding: 0.75rem 1.5rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 24px;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .send-button:hover:not(:disabled) {
          background: #2563eb;
        }

        .send-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-icon {
          font-size: 1rem;
        }

        /* Scrollbar styling */
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
