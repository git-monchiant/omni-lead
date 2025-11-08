import React, { useState, useEffect, useRef } from 'react';

interface Conversation {
  id: string;
  leadName: string;
  leadId: string;
  channel: 'line' | 'facebook' | 'whatsapp';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'active' | 'pending' | 'closed';
  avatar?: string;
}

interface Message {
  id: string;
  conversationId: string;
  sender: 'customer' | 'agent';
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<'all' | 'line' | 'facebook' | 'whatsapp'>('all');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock conversations
  const conversations: Conversation[] = [
    {
      id: 'conv1',
      leadName: 'สมหญิง รักสุข',
      leadId: '2',
      channel: 'line',
      lastMessage: 'ขอบคุณครับ ผมจะพิจารณาดูนะครับ',
      lastMessageTime: '10:30',
      unreadCount: 2,
      status: 'active'
    },
    {
      id: 'conv2',
      leadName: 'วิชัย มั่นคง',
      leadId: '3',
      channel: 'facebook',
      lastMessage: 'สนใจครับ ราคาเท่าไหร่',
      lastMessageTime: '09:15',
      unreadCount: 0,
      status: 'active'
    },
    {
      id: 'conv3',
      leadName: 'ประยุทธ์ ดีงาม',
      leadId: '5',
      channel: 'whatsapp',
      lastMessage: 'ส่งรายละเอียดให้หน่อยครับ',
      lastMessageTime: 'Yesterday',
      unreadCount: 1,
      status: 'pending'
    }
  ];

  // Mock messages
  const allMessages: Message[] = [
    {
      id: 'msg1',
      conversationId: 'conv1',
      sender: 'customer',
      message: 'สวัสดีครับ สนใจสินค้าของคุณ',
      timestamp: '10:20',
      status: 'read'
    },
    {
      id: 'msg2',
      conversationId: 'conv1',
      sender: 'agent',
      message: 'สวัสดีครับ ขอบคุณที่สนใจนะครับ อยากทราบข้อมูลเพิ่มเติมไหมครับ',
      timestamp: '10:22',
      status: 'read'
    },
    {
      id: 'msg3',
      conversationId: 'conv1',
      sender: 'customer',
      message: 'อยากทราบราคาและโปรโมชั่นครับ',
      timestamp: '10:25',
      status: 'read'
    },
    {
      id: 'msg4',
      conversationId: 'conv1',
      sender: 'agent',
      message: 'ราคาปกติ 5,000 บาท ตอนนี้มีโปรโมชั่นลดพิเศษ 20% เหลือ 4,000 บาทครับ',
      timestamp: '10:27',
      status: 'delivered'
    },
    {
      id: 'msg5',
      conversationId: 'conv1',
      sender: 'customer',
      message: 'ขอบคุณครับ ผมจะพิจารณาดูนะครับ',
      timestamp: '10:30',
      status: 'sent'
    }
  ];

  const filteredConversations = conversations.filter(conv => {
    if (selectedChannel !== 'all' && conv.channel !== selectedChannel) return false;
    return true;
  });

  const currentMessages = selectedConversation
    ? allMessages.filter(msg => msg.conversationId === selectedConversation)
    : [];

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  const getChannelColor = (channel: string) => {
    const colors = {
      line: '#06C755',
      facebook: '#0084FF',
      whatsapp: '#25D366'
    };
    return colors[channel] || '#6b7280';
  };

  const getChannelIcon = (channel: string) => {
    const icons = {
      line: '💚',
      facebook: '💙',
      whatsapp: '💬'
    };
    return icons[channel] || '💬';
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversation) return;

    // TODO: Send message via socket
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Sidebar - Conversations List */}
      <div style={{ width: '320px', backgroundColor: 'white', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
            💬 Omni-Channel Chat
          </h2>

          {/* Channel Filter */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            <button
              onClick={() => setSelectedChannel('all')}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: selectedChannel === 'all' ? '#3b82f6' : '#f3f4f6',
                color: selectedChannel === 'all' ? 'white' : '#6b7280'
              }}
            >
              All
            </button>
            <button
              onClick={() => setSelectedChannel('line')}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: selectedChannel === 'line' ? '#06C755' : '#f3f4f6',
                color: selectedChannel === 'line' ? 'white' : '#6b7280'
              }}
            >
              💚 LINE
            </button>
            <button
              onClick={() => setSelectedChannel('facebook')}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: selectedChannel === 'facebook' ? '#0084FF' : '#f3f4f6',
                color: selectedChannel === 'facebook' ? 'white' : '#6b7280'
              }}
            >
              💙 FB
            </button>
            <button
              onClick={() => setSelectedChannel('whatsapp')}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                backgroundColor: selectedChannel === 'whatsapp' ? '#25D366' : '#f3f4f6',
                color: selectedChannel === 'whatsapp' ? 'white' : '#6b7280'
              }}
            >
              💬 WA
            </button>
          </div>
        </div>

        {/* Conversations List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv.id)}
              style={{
                padding: '16px',
                borderBottom: '1px solid #e5e7eb',
                cursor: 'pointer',
                backgroundColor: selectedConversation === conv.id ? '#eff6ff' : 'white',
                transition: 'background-color 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                {/* Avatar */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: getChannelColor(conv.channel) + '20',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  flexShrink: 0
                }}>
                  {getChannelIcon(conv.channel)}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{conv.leadName}</div>
                    <div style={{ fontSize: '10px', color: '#6b7280' }}>{conv.lastMessageTime}</div>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#6b7280',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {conv.lastMessage}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <span style={{
                      fontSize: '10px',
                      padding: '2px 8px',
                      borderRadius: '8px',
                      backgroundColor: getChannelColor(conv.channel) + '20',
                      color: getChannelColor(conv.channel),
                      fontWeight: '500'
                    }}>
                      {conv.channel.toUpperCase()}
                    </span>
                    {conv.unreadCount > 0 && (
                      <span style={{
                        fontSize: '10px',
                        padding: '2px 8px',
                        borderRadius: '10px',
                        backgroundColor: '#ef4444',
                        color: 'white',
                        fontWeight: '600'
                      }}>
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedConversation && currentConversation ? (
          <>
            {/* Chat Header */}
            <div style={{
              padding: '16px 24px',
              backgroundColor: 'white',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  {currentConversation.leadName}
                </h3>
                <div style={{ fontSize: '14px', color: '#6b7280', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span>{getChannelIcon(currentConversation.channel)}</span>
                  <span>{currentConversation.channel.toUpperCase()}</span>
                  <span>•</span>
                  <span style={{
                    color: currentConversation.status === 'active' ? '#10b981' : '#6b7280',
                    fontWeight: '500'
                  }}>
                    {currentConversation.status === 'active' ? '● Active' : '○ Pending'}
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👤 View Lead
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  📞 Call
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              backgroundColor: '#f9fafb'
            }}>
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'agent' ? 'flex-end' : 'flex-start',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{
                    maxWidth: '60%',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    backgroundColor: msg.sender === 'agent' ? '#3b82f6' : 'white',
                    color: msg.sender === 'agent' ? 'white' : '#1f2937',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{ fontSize: '14px', lineHeight: '1.5' }}>{msg.message}</div>
                    <div style={{
                      fontSize: '10px',
                      marginTop: '4px',
                      opacity: 0.7,
                      textAlign: 'right'
                    }}>
                      {msg.timestamp} {msg.sender === 'agent' && (msg.status === 'read' ? '✓✓' : '✓')}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div style={{
              padding: '16px 24px',
              backgroundColor: 'white',
              borderTop: '1px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button style={{
                  padding: '8px',
                  backgroundColor: '#f3f4f6',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '20px'
                }}>
                  📎
                </button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: messageInput.trim() ? '#3b82f6' : '#d1d5db',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: messageInput.trim() ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Send
                </button>
              </div>

              {/* Quick Replies */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', color: '#6b7280', marginRight: '8px' }}>Quick replies:</span>
                {['สวัสดีครับ', 'ขอบคุณครับ', 'รอสักครู่นะครับ', 'ส่งข้อมูลเพิ่มเติมให้นะครับ'].map((reply) => (
                  <button
                    key={reply}
                    onClick={() => setMessageInput(reply)}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#6b7280'
                    }}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '16px'
          }}>
            Select a conversation to start chatting
          </div>
        )}
      </div>

      {/* Right Sidebar - Lead Info */}
      {selectedConversation && currentConversation && (
        <div style={{
          width: '280px',
          backgroundColor: 'white',
          borderLeft: '1px solid #e5e7eb',
          padding: '24px',
          overflowY: 'auto'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
            Lead Information
          </h3>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Name</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>{currentConversation.leadName}</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Channel</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>
              {getChannelIcon(currentConversation.channel)} {currentConversation.channel.toUpperCase()}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Status</div>
            <div style={{ fontSize: '14px', fontWeight: '500' }}>
              {currentConversation.status}
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '8px' }}>Tags</div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#dbeafe',
                color: '#1e40af',
                borderRadius: '4px',
                fontSize: '10px'
              }}>
                Hot Lead
              </span>
              <span style={{
                padding: '4px 8px',
                backgroundColor: '#fef3c7',
                color: '#92400e',
                borderRadius: '4px',
                fontSize: '10px'
              }}>
                Follow-up
              </span>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '8px' }}>Notes</div>
            <textarea
              placeholder="Add notes about this lead..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>

          <button style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Convert to Lead
          </button>
        </div>
      )}
    </div>
  );
}
