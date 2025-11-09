import React from 'react';
import { Lead } from '../types';

interface LeadListProps {
  leads: Lead[];
  selectedLead: Lead | null;
  onSelectLead: (lead: Lead) => void;
}

export default function LeadList({ leads, selectedLead, onSelectLead }: LeadListProps) {
  const getStatusColor = (status: string) => {
    const colors = {
      new: '#3b82f6',
      contacted: '#f59e0b',
      qualified: '#8b5cf6',
      converted: '#10b981',
      lost: '#ef4444',
    };
    return colors[status as keyof typeof colors] || '#6b7280';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      new: 'ใหม่',
      contacted: 'ติดต่อแล้ว',
      qualified: 'มีคุณสมบัติ',
      converted: 'ปิดการขาย',
      lost: 'สูญเสีย',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'เมื่อสักครู่';
    if (diffMins < 60) return `${diffMins} นาทีที่แล้ว`;
    if (diffHours < 24) return `${diffHours} ชั่วโมงที่แล้ว`;
    if (diffDays < 7) return `${diffDays} วันที่แล้ว`;
    return date.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="lead-list">
      {leads.length === 0 ? (
        <div className="empty-leads">
          <p>ไม่พบ Lead</p>
        </div>
      ) : (
        leads.map((lead) => (
          <div
            key={lead.id}
            className={`lead-item ${selectedLead?.id === lead.id ? 'selected' : ''}`}
            onClick={() => onSelectLead(lead)}
          >
            <div className="lead-item-header">
              <h3 className="lead-name">{lead.name}</h3>
              <span
                className="lead-status-badge"
                style={{ backgroundColor: getStatusColor(lead.status) }}
              >
                {getStatusLabel(lead.status)}
              </span>
            </div>

            <p className="lead-phone">{lead.phone}</p>

            {lead.source && (
              <span className="lead-source">📱 {lead.source}</span>
            )}

            {lead.notes && (
              <p className="lead-notes">{lead.notes}</p>
            )}

            <div className="lead-item-footer">
              <span className="lead-time">
                {formatDate(lead.lastContactedAt || lead.createdAt)}
              </span>
            </div>
          </div>
        ))
      )}

      <style jsx>{`
        .lead-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .empty-leads {
          padding: 2rem;
          text-align: center;
          color: #9ca3af;
        }

        .lead-item {
          padding: 1rem;
          margin-bottom: 0.5rem;
          border-radius: 8px;
          background: #f9fafb;
          cursor: pointer;
          transition: all 0.2s;
          border: 2px solid transparent;
        }

        .lead-item:hover {
          background: #f3f4f6;
        }

        .lead-item.selected {
          background: #eff6ff;
          border-color: #3b82f6;
        }

        .lead-item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .lead-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          flex: 1;
        }

        .lead-status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          color: white;
          font-weight: 500;
          white-space: nowrap;
          margin-left: 0.5rem;
        }

        .lead-phone {
          margin: 0 0 0.5rem 0;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .lead-source {
          display: inline-block;
          font-size: 0.75rem;
          color: #6b7280;
          background: white;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .lead-notes {
          margin: 0.5rem 0;
          font-size: 0.8125rem;
          color: #4b5563;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .lead-item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.5rem;
        }

        .lead-time {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        /* Scrollbar styling */
        .lead-list::-webkit-scrollbar {
          width: 6px;
        }

        .lead-list::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        .lead-list::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .lead-list::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
