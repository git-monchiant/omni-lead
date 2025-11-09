import React, { useState, useEffect, useRef } from 'react';
import { Lead, Message } from '../types';
import { Socket } from 'socket.io-client';
import { mockMessages } from '../data/mockData';

interface ChatPanelProps {
  lead: Lead;
  socket: Socket | null;
}

export default function ChatPanel({ lead, socket }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCallForm, setShowCallForm] = useState(false);
  const [callForm, setCallForm] = useState({
    duration: '',
    notes: '',
    status: 'outgoing' as 'completed' | 'missed' | 'incoming' | 'outgoing',
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load messages for selected lead (includes both chat and call)
    const leadMessages = mockMessages[lead.id] || [];
    setMessages(leadMessages);
  }, [lead.id]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    // Listen for new messages
    socket.on('new-message', (data: Message) => {
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
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      leadId: lead.id,
      type: 'chat',
      message: newMessage,
      sender: 'agent',
      createdAt: new Date().toISOString(),
    };

    // Send via socket if connected
    if (socket) {
      socket.emit('send-message', {
        leadId: lead.id,
        message: newMessage,
        sender: 'agent',
      });
    }

    // Add to local state
    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();

    const callMessage: Message = {
      id: `call-${Date.now()}`,
      leadId: lead.id,
      type: 'call',
      sender: 'agent',
      callDuration: callForm.duration ? parseInt(callForm.duration) : undefined,
      callStatus: callForm.status,
      callNotes: callForm.notes,
      createdAt: new Date().toISOString(),
    };

    // Add to messages
    setMessages((prev) => [...prev, callMessage]);

    // Reset form
    setCallForm({ duration: '', notes: '', status: 'outgoing' });
    setShowCallForm(false);
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

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'ไม่ระบุระยะเวลา';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins} นาที ${secs > 0 ? secs + ' วินาที' : ''}`;
    }
    return `${secs} วินาที`;
  };

  const getPlatformIcon = (platform?: string) => {
    const icons = {
      line: '💚',
      facebook: '💙',
      web: '🌐',
    };
    return icons[platform as keyof typeof icons] || '💬';
  };

  const getCallStatusIcon = (status?: string) => {
    const icons = {
      completed: '✅',
      missed: '❌',
      incoming: '📞',
      outgoing: '📱',
    };
    return icons[status as keyof typeof icons] || '📞';
  };

  const getCallStatusLabel = (status?: string) => {
    const labels = {
      completed: 'สำเร็จ',
      missed: 'ไม่รับสาย',
      incoming: 'สายเข้า',
      outgoing: 'โทรออก',
    };
    return labels[status as keyof typeof labels] || status;
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

                  {/* Chat Message */}
                  {msg.type === 'chat' && (
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
                  )}

                  {/* Call Message */}
                  {msg.type === 'call' && (
                    <div className="call-message">
                      <div className="call-icon">
                        {getCallStatusIcon(msg.callStatus)}
                      </div>
                      <div className="call-content">
                        <div className="call-header">
                          <span className="call-status">
                            {getCallStatusLabel(msg.callStatus)}
                          </span>
                          <span className="call-duration">
                            {formatDuration(msg.callDuration)}
                          </span>
                        </div>
                        {msg.callNotes && (
                          <p className="call-notes">{msg.callNotes}</p>
                        )}
                        <span className="call-time">{formatTime(msg.createdAt)}</span>
                      </div>
                    </div>
                  )}
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

      {/* Call Form Modal */}
      {showCallForm && (
        <div className="call-form-overlay" onClick={() => setShowCallForm(false)}>
          <div className="call-form-modal" onClick={(e) => e.stopPropagation()}>
            <h3>บันทึกการโทร</h3>
            <form onSubmit={handleLogCall}>
              <div className="form-group">
                <label>สถานะ</label>
                <select
                  value={callForm.status}
                  onChange={(e) => setCallForm({ ...callForm, status: e.target.value as any })}
                  className="form-select"
                  required
                >
                  <option value="outgoing">โทรออก</option>
                  <option value="incoming">รับสาย</option>
                  <option value="missed">ไม่รับสาย</option>
                  <option value="completed">สำเร็จ</option>
                </select>
              </div>

              <div className="form-group">
                <label>ระยะเวลา (วินาที)</label>
                <input
                  type="number"
                  value={callForm.duration}
                  onChange={(e) => setCallForm({ ...callForm, duration: e.target.value })}
                  placeholder="เช่น 180"
                  className="form-input"
                  min="0"
                />
                {callForm.duration && (
                  <span className="input-hint">
                    ≈ {formatDuration(parseInt(callForm.duration))}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>บันทึก *</label>
                <textarea
                  value={callForm.notes}
                  onChange={(e) => setCallForm({ ...callForm, notes: e.target.value })}
                  placeholder="รายละเอียดการโทร..."
                  className="form-textarea"
                  rows={4}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowCallForm(false)}
                  className="cancel-btn"
                >
                  ยกเลิก
                </button>
                <button type="submit" className="submit-btn">
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="message-input-container">
        <button
          type="button"
          onClick={() => setShowCallForm(true)}
          className="call-button"
          title="บันทึกการโทร"
        >
          📞
        </button>

        <form onSubmit={handleSendMessage} className="message-form">
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
      </div>

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
          gap: 0.75rem;
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
          margin: 1rem 0;
        }

        .date-divider span {
          background: #e5e7eb;
          padding: 0.25rem 1rem;
          border-radius: 12px;
          font-size: 0.75rem;
          color: #6b7280;
        }

        /* Chat Messages */
        .message {
          display: flex;
          margin-bottom: 0.5rem;
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

        /* Call Messages */
        .call-message {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: #fef3c7;
          border-left: 4px solid #f59e0b;
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .call-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .call-content {
          flex: 1;
        }

        .call-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .call-status {
          font-weight: 600;
          color: #92400e;
          font-size: 0.9375rem;
        }

        .call-duration {
          font-size: 0.8125rem;
          color: #78350f;
          background: white;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
        }

        .call-notes {
          margin: 0.5rem 0;
          font-size: 0.875rem;
          color: #78350f;
          line-height: 1.5;
        }

        .call-time {
          font-size: 0.75rem;
          color: #92400e;
          opacity: 0.8;
        }

        /* Typing Indicator */
        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 0.75rem 1rem;
          background: white;
          border-radius: 12px;
          width: fit-content;
          border: 1px solid #e5e7eb;
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

        /* Call Form Modal */
        .call-form-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .call-form-modal {
          background: white;
          padding: 2rem;
          border-radius: 16px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
        }

        .call-form-modal h3 {
          margin: 0 0 1.5rem 0;
          font-size: 1.25rem;
          color: #1f2937;
        }

        .form-group {
          margin-bottom: 1.25rem;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .form-select,
        .form-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.9375rem;
          outline: none;
        }

        .form-select:focus,
        .form-input:focus,
        .form-textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .form-textarea {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.9375rem;
          font-family: inherit;
          outline: none;
          resize: vertical;
        }

        .input-hint {
          display: block;
          font-size: 0.75rem;
          color: #6b7280;
          margin-top: 0.5rem;
        }

        .form-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.5rem;
        }

        .cancel-btn,
        .submit-btn {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9375rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-btn {
          background: #f3f4f6;
          color: #374151;
        }

        .cancel-btn:hover {
          background: #e5e7eb;
        }

        .submit-btn {
          background: #3b82f6;
          color: white;
        }

        .submit-btn:hover {
          background: #2563eb;
        }

        /* Input Area */
        .message-input-container {
          display: flex;
          gap: 0.75rem;
          padding: 1rem 1.5rem;
          background: white;
          border-top: 1px solid #e5e7eb;
        }

        .call-button {
          width: 48px;
          height: 48px;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 24px;
          font-size: 1.5rem;
          cursor: pointer;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .call-button:hover {
          background: #f9fafb;
          border-color: #3b82f6;
        }

        .message-form {
          display: flex;
          gap: 0.75rem;
          flex: 1;
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
