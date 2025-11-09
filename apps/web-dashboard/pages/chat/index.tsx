import React, { useState, useEffect } from 'react';
import { Lead, FollowUpType } from '../../types';
import LeadList from '../../components/LeadList';
import ChatPanel from '../../components/ChatPanel';
import CallLogPanel from '../../components/CallLogPanel';
import LeadDetail from '../../components/LeadDetail';
import { useSocket } from '../../hooks/useSocket';
import { mockLeads } from '../../data/mockData';

export default function LeadFollowupPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [activeTab, setActiveTab] = useState<FollowUpType>('chat');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { socket, isConnected } = useSocket();

  // Load mock data
  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const fetchLeads = async () => {
    // Using mock data - Replace with actual API call when backend is ready
    setLeads(mockLeads);
  };

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead);
    // Join socket room for this lead
    if (socket) {
      socket.emit('join-lead-chat', lead.id);
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="lead-followup-container">
      {/* Header */}
      <header className="page-header">
        <h1>Lead Follow-up</h1>
        <div className="header-actions">
          <span className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </span>
        </div>
      </header>

      <div className="main-content">
        {/* Left Panel - Lead List */}
        <aside className="lead-list-panel">
          <div className="search-filter-section">
            <input
              type="text"
              placeholder="ค้นหา Lead (ชื่อ, เบอร์โทร)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="all">ทั้งหมด</option>
              <option value="new">ใหม่</option>
              <option value="contacted">ติดต่อแล้ว</option>
              <option value="qualified">มีคุณสมบัติ</option>
              <option value="converted">ปิดการขาย</option>
              <option value="lost">สูญเสีย</option>
            </select>
          </div>

          <LeadList
            leads={filteredLeads}
            selectedLead={selectedLead}
            onSelectLead={handleLeadSelect}
          />
        </aside>

        {/* Center Panel - Chat or Call */}
        <main className="interaction-panel">
          {selectedLead ? (
            <>
              {/* Lead Header with Tabs */}
              <div className="interaction-header">
                <div className="lead-info">
                  <h2>{selectedLead.name}</h2>
                  <p className="lead-meta">
                    <span>{selectedLead.phone}</span>
                    {selectedLead.email && <span> • {selectedLead.email}</span>}
                  </p>
                </div>

                <div className="tab-navigation">
                  <button
                    className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
                    onClick={() => setActiveTab('chat')}
                  >
                    💬 แชท
                  </button>
                  <button
                    className={`tab-button ${activeTab === 'call' ? 'active' : ''}`}
                    onClick={() => setActiveTab('call')}
                  >
                    📞 โทร
                  </button>
                </div>
              </div>

              {/* Content Area */}
              <div className="interaction-content">
                {activeTab === 'chat' ? (
                  <ChatPanel lead={selectedLead} socket={socket} />
                ) : (
                  <CallLogPanel lead={selectedLead} />
                )}
              </div>
            </>
          ) : (
            <div className="no-selection">
              <div className="empty-state">
                <h3>เลือก Lead เพื่อเริ่มติดตาม</h3>
                <p>กรุณาเลือก Lead จากรายการด้านซ้ายเพื่อดูรายละเอียดและติดตาม</p>
              </div>
            </div>
          )}
        </main>

        {/* Right Panel - Lead Details & Activity */}
        <aside className="detail-panel">
          {selectedLead ? (
            <LeadDetail lead={selectedLead} />
          ) : (
            <div className="no-detail">
              <p>ไม่มีข้อมูล</p>
            </div>
          )}
        </aside>
      </div>

      <style jsx>{`
        .lead-followup-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f5f7fa;
        }

        .page-header {
          background: white;
          padding: 1.5rem 2rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .page-header h1 {
          margin: 0;
          font-size: 1.5rem;
          color: #1f2937;
        }

        .connection-status {
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background: #f3f4f6;
        }

        .connection-status.connected {
          color: #059669;
        }

        .connection-status.disconnected {
          color: #dc2626;
        }

        .main-content {
          display: grid;
          grid-template-columns: 320px 1fr 360px;
          gap: 0;
          flex: 1;
          overflow: hidden;
        }

        .lead-list-panel {
          background: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .search-filter-section {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          margin-bottom: 0.75rem;
        }

        .search-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .status-filter {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.875rem;
          background: white;
        }

        .interaction-panel {
          display: flex;
          flex-direction: column;
          background: white;
          overflow: hidden;
        }

        .interaction-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .lead-info h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.25rem;
          color: #1f2937;
        }

        .lead-meta {
          margin: 0;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .lead-meta span {
          margin-right: 0.5rem;
        }

        .tab-navigation {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .tab-button {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border: 1px solid #e5e7eb;
          background: white;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-button:hover {
          background: #f9fafb;
        }

        .tab-button.active {
          background: #3b82f6;
          color: white;
          border-color: #3b82f6;
        }

        .interaction-content {
          flex: 1;
          overflow: hidden;
        }

        .no-selection {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        .empty-state {
          text-align: center;
          color: #9ca3af;
        }

        .empty-state h3 {
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .detail-panel {
          background: white;
          border-left: 1px solid #e5e7eb;
          overflow-y: auto;
        }

        .no-detail {
          padding: 2rem;
          text-align: center;
          color: #9ca3af;
        }

        @media (max-width: 1280px) {
          .main-content {
            grid-template-columns: 280px 1fr 320px;
          }
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 280px 1fr;
          }

          .detail-panel {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            grid-template-columns: 1fr;
          }

          .lead-list-panel {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
