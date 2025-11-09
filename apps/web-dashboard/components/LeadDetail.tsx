import React, { useState } from 'react';
import { Lead, Activity } from '../types';

interface LeadDetailProps {
  lead: Lead;
}

export default function LeadDetail({ lead }: LeadDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);

  const handleSave = () => {
    // TODO: Send update to API
    setIsEditing(false);
  };

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return 'ไม่ระบุ';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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

  // Mock activities - replace with actual data
  const activities: Activity[] = [
    {
      id: '1',
      type: 'call',
      timestamp: '2024-01-15T14:20:00Z',
      description: 'โทรแนะนำโครงการ',
      user: 'ทีมขาย A',
    },
    {
      id: '2',
      type: 'chat',
      timestamp: '2024-01-15T10:36:00Z',
      description: 'ส่งข้อความทาง Facebook',
      user: 'ทีมขาย A',
    },
  ];

  return (
    <div className="lead-detail">
      <div className="detail-header">
        <h3>รายละเอียด Lead</h3>
        {!isEditing ? (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            ✏️ แก้ไข
          </button>
        ) : (
          <div className="edit-actions">
            <button className="cancel-button" onClick={() => setIsEditing(false)}>
              ยกเลิก
            </button>
            <button className="save-button" onClick={handleSave}>
              บันทึก
            </button>
          </div>
        )}
      </div>

      <div className="detail-content">
        <div className="info-section">
          <h4 className="section-title">ข้อมูลติดต่อ</h4>

          <div className="info-group">
            <label>ชื่อ</label>
            {isEditing ? (
              <input
                type="text"
                value={editedLead.name}
                onChange={(e) => setEditedLead({ ...editedLead, name: e.target.value })}
                className="info-input"
              />
            ) : (
              <p className="info-value">{lead.name}</p>
            )}
          </div>

          <div className="info-group">
            <label>เบอร์โทร</label>
            {isEditing ? (
              <input
                type="tel"
                value={editedLead.phone}
                onChange={(e) => setEditedLead({ ...editedLead, phone: e.target.value })}
                className="info-input"
              />
            ) : (
              <p className="info-value">
                <a href={`tel:${lead.phone}`} className="phone-link">
                  📞 {lead.phone}
                </a>
              </p>
            )}
          </div>

          <div className="info-group">
            <label>อีเมล</label>
            {isEditing ? (
              <input
                type="email"
                value={editedLead.email || ''}
                onChange={(e) => setEditedLead({ ...editedLead, email: e.target.value })}
                className="info-input"
              />
            ) : (
              <p className="info-value">
                {lead.email ? (
                  <a href={`mailto:${lead.email}`} className="email-link">
                    📧 {lead.email}
                  </a>
                ) : (
                  'ไม่ระบุ'
                )}
              </p>
            )}
          </div>
        </div>

        <div className="info-section">
          <h4 className="section-title">สถานะและแหล่งที่มา</h4>

          <div className="info-group">
            <label>สถานะ</label>
            {isEditing ? (
              <select
                value={editedLead.status}
                onChange={(e) => setEditedLead({ ...editedLead, status: e.target.value as any })}
                className="info-select"
              >
                <option value="new">ใหม่</option>
                <option value="contacted">ติดต่อแล้ว</option>
                <option value="qualified">มีคุณสมบัติ</option>
                <option value="converted">ปิดการขาย</option>
                <option value="lost">สูญเสีย</option>
              </select>
            ) : (
              <p className="info-value">
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(lead.status) }}
                >
                  {getStatusLabel(lead.status)}
                </span>
              </p>
            )}
          </div>

          <div className="info-group">
            <label>แหล่งที่มา</label>
            {isEditing ? (
              <input
                type="text"
                value={editedLead.source || ''}
                onChange={(e) => setEditedLead({ ...editedLead, source: e.target.value })}
                className="info-input"
              />
            ) : (
              <p className="info-value">{lead.source || 'ไม่ระบุ'}</p>
            )}
          </div>
        </div>

        <div className="info-section">
          <h4 className="section-title">บันทึก</h4>
          <div className="info-group">
            {isEditing ? (
              <textarea
                value={editedLead.notes || ''}
                onChange={(e) => setEditedLead({ ...editedLead, notes: e.target.value })}
                className="info-textarea"
                rows={4}
                placeholder="บันทึกเพิ่มเติม..."
              />
            ) : (
              <p className="info-value notes">{lead.notes || 'ไม่มีบันทึก'}</p>
            )}
          </div>
        </div>

        <div className="info-section">
          <h4 className="section-title">ข้อมูลเวลา</h4>

          <div className="info-group">
            <label>สร้างเมื่อ</label>
            <p className="info-value time">{formatDateTime(lead.createdAt)}</p>
          </div>

          <div className="info-group">
            <label>ติดต่อล่าสุด</label>
            <p className="info-value time">{formatDateTime(lead.lastContactedAt)}</p>
          </div>

          <div className="info-group">
            <label>ติดตามครั้งถัดไป</label>
            <p className="info-value time highlight">{formatDateTime(lead.nextFollowUpAt)}</p>
          </div>
        </div>

        <div className="info-section">
          <h4 className="section-title">กิจกรรมล่าสุด</h4>
          <div className="activity-timeline">
            {activities.length === 0 ? (
              <p className="empty-activity">ไม่มีกิจกรรม</p>
            ) : (
              activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'call' ? '📞' : '💬'}
                  </div>
                  <div className="activity-content">
                    <p className="activity-description">{activity.description}</p>
                    <p className="activity-meta">
                      {activity.user} • {formatDateTime(activity.timestamp)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .lead-detail {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: white;
        }

        .detail-header {
          padding: 1.5rem;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .detail-header h3 {
          margin: 0;
          font-size: 1.125rem;
          color: #1f2937;
        }

        .edit-button {
          padding: 0.5rem 1rem;
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .edit-button:hover {
          background: #e5e7eb;
        }

        .edit-actions {
          display: flex;
          gap: 0.5rem;
        }

        .cancel-button,
        .save-button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .cancel-button {
          background: #f3f4f6;
          color: #374151;
        }

        .cancel-button:hover {
          background: #e5e7eb;
        }

        .save-button {
          background: #3b82f6;
          color: white;
        }

        .save-button:hover {
          background: #2563eb;
        }

        .detail-content {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .info-section {
          margin-bottom: 2rem;
        }

        .section-title {
          margin: 0 0 1rem 0;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #1f2937;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .info-group {
          margin-bottom: 1rem;
        }

        .info-group label {
          display: block;
          font-size: 0.8125rem;
          font-weight: 500;
          color: #6b7280;
          margin-bottom: 0.375rem;
        }

        .info-value {
          margin: 0;
          font-size: 0.9375rem;
          color: #1f2937;
        }

        .info-value.notes {
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .info-value.time {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .info-value.time.highlight {
          color: #3b82f6;
          font-weight: 500;
        }

        .phone-link,
        .email-link {
          color: #3b82f6;
          text-decoration: none;
        }

        .phone-link:hover,
        .email-link:hover {
          text-decoration: underline;
        }

        .status-badge {
          display: inline-block;
          padding: 0.375rem 0.875rem;
          border-radius: 12px;
          font-size: 0.8125rem;
          color: white;
          font-weight: 500;
        }

        .info-input,
        .info-select {
          width: 100%;
          padding: 0.625rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 0.9375rem;
          outline: none;
        }

        .info-input:focus,
        .info-select:focus,
        .info-textarea:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .info-textarea {
          width: 100%;
          padding: 0.625rem;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 0.9375rem;
          font-family: inherit;
          outline: none;
          resize: vertical;
        }

        .activity-timeline {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .empty-activity {
          text-align: center;
          color: #9ca3af;
          font-size: 0.875rem;
          padding: 1rem;
        }

        .activity-item {
          display: flex;
          gap: 0.75rem;
        }

        .activity-icon {
          font-size: 1.25rem;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f4f6;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-description {
          margin: 0 0 0.25rem 0;
          font-size: 0.9375rem;
          color: #1f2937;
        }

        .activity-meta {
          margin: 0;
          font-size: 0.75rem;
          color: #9ca3af;
        }

        /* Scrollbar styling */
        .detail-content::-webkit-scrollbar {
          width: 6px;
        }

        .detail-content::-webkit-scrollbar-track {
          background: #f3f4f6;
        }

        .detail-content::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .detail-content::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
