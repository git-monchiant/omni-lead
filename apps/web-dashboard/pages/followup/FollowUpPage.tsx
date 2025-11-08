import React, { useState } from 'react';
import SubHeader from '../../components/SubHeader';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'form' | 'chat';
  channel?: 'line' | 'facebook' | 'whatsapp';
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  lastActivity: string;
  lastMessage?: string;
  unreadCount?: number;
}

interface Activity {
  id: string;
  leadId: string;
  type: 'chat' | 'tel';
  channel?: 'line' | 'facebook' | 'whatsapp';
  message?: string;
  duration?: string;
  direction?: 'incoming' | 'outgoing';
  sender?: 'customer' | 'agent';
  timestamp: string;
  notes?: string;
  status?: 'sent' | 'delivered' | 'read';
}

export default function FollowUpPage() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [activityFilter, setActivityFilter] = useState<'all' | 'chat' | 'tel'>('all');
  const [messageInput, setMessageInput] = useState('');

  // Mock leads data
  const leads: Lead[] = [
    {
      id: '1',
      name: 'สมชาย ใจดี',
      phone: '081-234-5678',
      email: 'somchai@email.com',
      source: 'form',
      status: 'contacted',
      lastActivity: '2024-01-15 10:30',
      unreadCount: 0
    },
    {
      id: '2',
      name: 'สมหญิง รักสุข',
      phone: '082-345-6789',
      email: '',
      source: 'chat',
      channel: 'line',
      status: 'new',
      lastActivity: '2024-01-15 10:45',
      lastMessage: 'ขอบคุณครับ ผมจะพิจารณาดูนะครับ',
      unreadCount: 2
    },
    {
      id: '3',
      name: 'วิชัย มั่นคง',
      phone: '083-456-7890',
      email: 'wichai@email.com',
      source: 'chat',
      channel: 'facebook',
      status: 'qualified',
      lastActivity: '2024-01-15 09:15',
      lastMessage: 'สนใจครับ ราคาเท่าไหร่',
      unreadCount: 0
    },
    {
      id: '4',
      name: 'มานี ศรีสุข',
      phone: '084-567-8901',
      email: '',
      source: 'chat',
      channel: 'whatsapp',
      status: 'converted',
      lastActivity: '2024-01-15 08:00',
      lastMessage: 'ตกลงครับ ผมจะโอนเงินวันนี้',
      unreadCount: 0
    }
  ];

  // Mock activities data
  const allActivities: Activity[] = [
    {
      id: 'a1',
      leadId: '2',
      type: 'chat',
      channel: 'line',
      sender: 'customer',
      message: 'สวัสดีครับ สนใจโครงการบ้านกลางเมืองครับ',
      timestamp: '10:30',
      status: 'read'
    },
    {
      id: 'a2',
      leadId: '2',
      type: 'chat',
      channel: 'line',
      sender: 'agent',
      message: 'สวัสดีครับ ยินดีให้คำปรึกษาครับ โครงการบ้านกลางเมืองเป็นโครงการ luxury ราคาเริ่มต้น 15 ล้านบาทครับ',
      timestamp: '10:32',
      status: 'read'
    },
    {
      id: 'a3',
      leadId: '2',
      type: 'chat',
      channel: 'line',
      sender: 'customer',
      message: 'ขอบคุณครับ ผมจะพิจารณาดูนะครับ',
      timestamp: '10:45',
      status: 'read'
    },
    {
      id: 'a4',
      leadId: '1',
      type: 'tel',
      direction: 'outgoing',
      duration: '15:30',
      timestamp: '10:30',
      notes: 'ติดต่อเพื่อนัดหมายดูห้องโชว์ ลูกค้าสนใจมาดูในวันเสาร์หน้า เวลา 14:00 น.'
    },
    {
      id: 'a5',
      leadId: '3',
      type: 'chat',
      channel: 'facebook',
      sender: 'customer',
      message: 'สนใจครับ ราคาเท่าไหร่',
      timestamp: '09:15',
      status: 'read'
    },
    {
      id: 'a6',
      leadId: '3',
      type: 'chat',
      channel: 'facebook',
      sender: 'agent',
      message: 'สวัสดีครับ ราคาเริ่มต้น 8.5 ล้านบาทครับ มี 3 แบบให้เลือก ต้องการข้อมูลเพิ่มเติมไหมครับ',
      timestamp: '09:20',
      status: 'delivered'
    },
    {
      id: 'a7',
      leadId: '4',
      type: 'chat',
      channel: 'whatsapp',
      sender: 'customer',
      message: 'ตกลงครับ ผมจะโอนเงินวันนี้',
      timestamp: '08:00',
      status: 'read'
    },
    {
      id: 'a8',
      leadId: '4',
      type: 'tel',
      direction: 'incoming',
      duration: '25:15',
      timestamp: '08:30',
      notes: 'ลูกค้าโอนเงินมัดจำแล้ว ส่งเอกสารสัญญาให้ทางอีเมล'
    }
  ];

  const getChannelIcon = (channel?: 'line' | 'facebook' | 'whatsapp') => {
    switch (channel) {
      case 'line': return '💚';
      case 'facebook': return '💙';
      case 'whatsapp': return '💬';
      default: return '📝';
    }
  };

  const getChannelColor = (channel?: 'line' | 'facebook' | 'whatsapp') => {
    switch (channel) {
      case 'line': return '#06C755';
      case 'facebook': return '#0084FF';
      case 'whatsapp': return '#25D366';
      default: return '#6b7280';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return '#3b82f6';
      case 'contacted': return '#f59e0b';
      case 'qualified': return '#10b981';
      case 'converted': return '#8b5cf6';
      case 'lost': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const leadActivities = selectedLead
    ? allActivities.filter(a => {
        if (a.leadId !== selectedLead) return false;
        if (activityFilter === 'all') return true;
        return a.type === activityFilter;
      })
    : [];

  const selectedLeadData = leads.find(l => l.id === selectedLead);
  const canSendMessage = activityFilter === 'chat' && selectedLeadData?.source === 'chat';

  const handleSendMessage = () => {
    if (!messageInput.trim() || !canSendMessage) return;
    console.log('Sending message:', messageInput);
    setMessageInput('');
  };

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <SubHeader
        title="Follow-up"
        subtitle="Track all conversations and call history with your leads"
        stats={[
          { icon: '👥', label: 'Leads', value: leads.length },
          { icon: '💬', label: 'Chats', value: allActivities.filter(a => a.type === 'chat').length },
          { icon: '📞', label: 'Calls', value: allActivities.filter(a => a.type === 'tel').length }
        ]}
      />

      {/* Main Content */}
      <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 200px)' }}>
        {/* Left Sidebar - Leads List */}
        <div style={{
          width: '320px',
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
              Leads
            </h2>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {leads.map((lead) => (
              <div
                key={lead.id}
                onClick={() => setSelectedLead(lead.id)}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  backgroundColor: selectedLead === lead.id ? '#eff6ff' : '#ffffff',
                  transition: 'background-color 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', color: '#0f172a' }}>
                    {lead.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>
                      {lead.source === 'chat' ? getChannelIcon(lead.channel) : '📝'}
                    </span>
                    {lead.unreadCount && lead.unreadCount > 0 && (
                      <span style={{
                        fontSize: '10px',
                        padding: '3px 6px',
                        borderRadius: '10px',
                        backgroundColor: '#ef4444',
                        color: '#ffffff',
                        fontWeight: '700'
                      }}>
                        {lead.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                  {lead.phone}
                </div>
                {lead.lastMessage && (
                  <div style={{
                    fontSize: '14px',
                    color: '#94a3b8',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '4px'
                  }}>
                    {lead.lastMessage}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: '10px',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    backgroundColor: getStatusColor(lead.status) + '15',
                    color: getStatusColor(lead.status),
                    fontWeight: '600'
                  }}>
                    {lead.status}
                  </span>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                    {lead.lastActivity.split(' ')[1]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle - Chat/Call History */}
        {selectedLead && selectedLeadData ? (
          <div style={{
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              backgroundColor: '#ffffff'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                    {selectedLeadData.name}
                  </h2>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>
                    {selectedLeadData.phone}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: selectedLeadData.source === 'chat' ? '#3b82f6' : '#f8fafc',
                    color: selectedLeadData.source === 'chat' ? '#ffffff' : '#64748b',
                    border: selectedLeadData.source === 'chat' ? 'none' : '1px solid #e2e8f0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Chat
                  </button>
                  <button style={{
                    padding: '8px 16px',
                    backgroundColor: '#10b981',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Call
                  </button>
                </div>
              </div>

              {/* Activity Filter */}
              <div style={{ display: 'flex', gap: '8px', backgroundColor: '#f8fafc', padding: '4px', borderRadius: '8px' }}>
                <button
                  onClick={() => setActivityFilter('all')}
                  style={{
                    padding: '6px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: activityFilter === 'all' ? '#ffffff' : 'transparent',
                    color: activityFilter === 'all' ? '#0f172a' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setActivityFilter('chat')}
                  style={{
                    padding: '6px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: activityFilter === 'chat' ? '#ffffff' : 'transparent',
                    color: activityFilter === 'chat' ? '#0f172a' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  Chat
                </button>
                <button
                  onClick={() => setActivityFilter('tel')}
                  style={{
                    padding: '6px 16px',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: activityFilter === 'tel' ? '#ffffff' : 'transparent',
                    color: activityFilter === 'tel' ? '#0f172a' : '#64748b',
                    transition: 'all 0.2s'
                  }}
                >
                  Call
                </button>
              </div>
            </div>

            {/* Activities/History */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              backgroundColor: '#f8fafc'
            }}>
              {leadActivities.map((activity) => (
                <div key={activity.id} style={{ marginBottom: '24px' }}>
                  {activity.type === 'chat' ? (
                    // Chat Message
                    <div style={{
                      display: 'flex',
                      justifyContent: activity.sender === 'agent' ? 'flex-end' : 'flex-start',
                      marginBottom: '8px'
                    }}>
                      <div style={{ maxWidth: '70%' }}>
                        {activity.sender === 'customer' && (
                          <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span>{getChannelIcon(activity.channel)}</span>
                            <span>{activity.channel?.toUpperCase()}</span>
                          </div>
                        )}
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: '12px',
                          backgroundColor: activity.sender === 'agent' ? '#3b82f6' : 'white',
                          color: activity.sender === 'agent' ? 'white' : '#1f2937',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}>
                          <div style={{ fontSize: '14px', lineHeight: '1.5' }}>
                            {activity.message}
                          </div>
                        </div>
                        <div style={{
                          fontSize: '10px',
                          color: '#9ca3af',
                          marginTop: '4px',
                          textAlign: activity.sender === 'agent' ? 'right' : 'left'
                        }}>
                          {activity.timestamp} {activity.sender === 'agent' && activity.status && (activity.status === 'read' ? '✓✓' : '✓')}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Phone Call Log
                    <div style={{
                      padding: '16px',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                      borderLeft: '3px solid #10b981'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{ fontSize: '20px' }}>📞</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                            {activity.direction === 'incoming' ? 'Incoming Call' : 'Outgoing Call'}
                          </div>
                          <div style={{ fontSize: '14px', color: '#6b7280' }}>
                            Duration: {activity.duration}
                          </div>
                        </div>
                        <div style={{ fontSize: '10px', color: '#9ca3af' }}>
                          {activity.timestamp}
                        </div>
                      </div>
                      {activity.notes && (
                        <div style={{
                          fontSize: '14px',
                          color: '#374151',
                          padding: '12px',
                          backgroundColor: '#f9fafb',
                          borderRadius: '8px',
                          marginTop: '8px'
                        }}>
                          <strong style={{ color: '#6b7280' }}>Notes:</strong> {activity.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Message Input (Only for Chat) */}
            {activityFilter === 'chat' && (
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: 'white'
              }}>
                {activityFilter === 'all' && (
                  <div style={{
                    marginBottom: '12px',
                    padding: '8px 12px',
                    backgroundColor: '#fef3c7',
                    borderRadius: '6px',
                    fontSize: '14px',
                    color: '#92400e'
                  }}>
                    💡 Switch to "Chat" filter to send messages
                  </div>
                )}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && canSendMessage && handleSendMessage()}
                    placeholder={canSendMessage ? 'Type a message...' : 'Switch to Chat mode to send messages'}
                    disabled={!canSendMessage}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: canSendMessage ? 'white' : '#f9fafb'
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim() || !canSendMessage}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: messageInput.trim() && canSendMessage ? '#3b82f6' : '#d1d5db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: messageInput.trim() && canSendMessage ? 'pointer' : 'not-allowed',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Send
                  </button>
                </div>
              </div>
            )}

            {/* Tel Mode Info */}
            {activityFilter === 'tel' && (
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid #e5e7eb',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#dbeafe',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#1e40af',
                  textAlign: 'center'
                }}>
                  📞 Call Mode - View call history. Click "Call" button to make a new call.
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9ca3af',
            fontSize: '16px'
          }}>
            Select a lead to view conversation history
          </div>
        )}

        {/* Right Sidebar - Lead Info */}
        {selectedLead && selectedLeadData && (
          <div style={{
            width: '280px',
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            padding: '24px',
            overflowY: 'auto'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
              Lead Information
            </h3>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Name</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedLeadData.name}</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Phone</div>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedLeadData.phone}</div>
            </div>

            {selectedLeadData.email && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{selectedLeadData.email}</div>
              </div>
            )}

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Source</div>
              <div style={{ fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                {selectedLeadData.source === 'chat' ? getChannelIcon(selectedLeadData.channel) : '📝'}
                {selectedLeadData.source === 'chat' ? selectedLeadData.channel?.toUpperCase() : 'Form'}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280', marginBottom: '4px' }}>Status</div>
              <div style={{
                display: 'inline-block',
                fontSize: '14px',
                fontWeight: '500',
                padding: '4px 12px',
                borderRadius: '12px',
                backgroundColor: getStatusColor(selectedLeadData.status) + '20',
                color: getStatusColor(selectedLeadData.status)
              }}>
                {selectedLeadData.status}
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
                  resize: 'vertical',
                  fontFamily: 'inherit'
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
              Save Notes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
