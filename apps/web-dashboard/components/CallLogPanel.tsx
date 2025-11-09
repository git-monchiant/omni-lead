import React, { useState, useEffect } from 'react';
import { Lead, Call } from '../types';
import { mockCalls } from '../data/mockData';

interface CallLogPanelProps {
  lead: Lead;
}

export default function CallLogPanel({ lead }: CallLogPanelProps) {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLogging, setIsLogging] = useState(false);
  const [newCall, setNewCall] = useState({
    duration: '',
    notes: '',
    status: 'completed' as 'completed' | 'missed' | 'scheduled',
  });

  useEffect(() => {
    // Load calls for selected lead
    const leadCalls = mockCalls[lead.id] || [];
    setCalls(leadCalls);
  }, [lead.id]);

  const handleSubmitCall = (e: React.FormEvent) => {
    e.preventDefault();

    const call: Call = {
      id: `call-${Date.now()}`,
      leadId: lead.id,
      userId: 'user1',
      duration: newCall.duration ? parseInt(newCall.duration) : undefined,
      notes: newCall.notes,
      status: newCall.status,
      createdAt: new Date().toISOString(),
    };

    // TODO: Send to API
    setCalls((prev) => [call, ...prev]);
    setNewCall({ duration: '', notes: '', status: 'completed' });
    setIsLogging(false);
  };

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'ไม่ระบุ';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} นาที ${secs} วินาที`;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      completed: '✅',
      missed: '❌',
      scheduled: '📅',
    };
    return icons[status as keyof typeof icons] || '📞';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      completed: 'สำเร็จ',
      missed: 'ไม่รับสาย',
      scheduled: 'นัดหมาย',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const getTotalCallTime = () => {
    const total = calls.reduce((sum, call) => sum + (call.duration || 0), 0);
    return formatDuration(total);
  };

  return (
    <div className="call-log-panel">
      <div className="call-stats">
        <div className="stat-card">
          <span className="stat-label">จำนวนการโทร</span>
          <span className="stat-value">{calls.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">เวลาโทรรวม</span>
          <span className="stat-value">{getTotalCallTime()}</span>
        </div>
      </div>

      {!isLogging ? (
        <button className="add-call-button" onClick={() => setIsLogging(true)}>
          <span className="button-icon">📞</span>
          <span>บันทึกการโทร</span>
        </button>
      ) : (
        <form onSubmit={handleSubmitCall} className="call-form">
          <h3 className="form-title">บันทึกการโทร</h3>

          <div className="form-group">
            <label>สถานะ</label>
            <select
              value={newCall.status}
              onChange={(e) => setNewCall({ ...newCall, status: e.target.value as any })}
              className="form-select"
              required
            >
              <option value="completed">สำเร็จ</option>
              <option value="missed">ไม่รับสาย</option>
              <option value="scheduled">นัดหมาย</option>
            </select>
          </div>

          <div className="form-group">
            <label>ระยะเวลา (วินาที)</label>
            <input
              type="number"
              value={newCall.duration}
              onChange={(e) => setNewCall({ ...newCall, duration: e.target.value })}
              placeholder="ระยะเวลาการโทร เช่น 180"
              className="form-input"
              min="0"
            />
            <span className="input-hint">
              {newCall.duration && `≈ ${formatDuration(parseInt(newCall.duration))}`}
            </span>
          </div>

          <div className="form-group">
            <label>บันทึกช่วยจำ *</label>
            <textarea
              value={newCall.notes}
              onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
              placeholder="บันทึกรายละเอียดการโทร..."
              className="form-textarea"
              rows={4}
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => {
                setIsLogging(false);
                setNewCall({ duration: '', notes: '', status: 'completed' });
              }}
              className="cancel-button"
            >
              ยกเลิก
            </button>
            <button type="submit" className="submit-button">
              บันทึก
            </button>
          </div>
        </form>
      )}

      <div className="calls-list">
        <h3 className="list-title">ประวัติการโทร</h3>
        {calls.length === 0 ? (
          <div className="empty-calls">
            <p>ยังไม่มีประวัติการโทร</p>
            <p className="empty-subtitle">เริ่มต้นบันทึกการโทรกับ {lead.name}</p>
          </div>
        ) : (
          calls.map((call) => (
            <div key={call.id} className="call-item">
              <div className="call-header">
                <span className="call-status">
                  {getStatusIcon(call.status)} {getStatusLabel(call.status)}
                </span>
                <span className="call-duration">{formatDuration(call.duration)}</span>
              </div>
              <p className="call-notes">{call.notes}</p>
              <span className="call-time">{formatDateTime(call.createdAt)}</span>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .call-log-panel {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: #f9fafb;
          overflow-y: auto;
          padding: 1.5rem;
        }

        .call-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .stat-card {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .stat-label {
          font-size: 0.8125rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .add-call-button {
          width: 100%;
          padding: 1rem;
          background: #3b82f6;
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          transition: all 0.2s;
        }

        .add-call-button:hover {
          background: #2563eb;
        }

        .button-icon {
          font-size: 1.25rem;
        }

        .call-form {
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 1.5rem;
        }

        .form-title {
          margin: 0 0 1.5rem 0;
          font-size: 1.125rem;
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

        .cancel-button,
        .submit-button {
          flex: 1;
          padding: 0.75rem;
          border: none;
          border-radius: 8px;
          font-size: 0.9375rem;
          font-weight: 500;
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

        .submit-button {
          background: #3b82f6;
          color: white;
        }

        .submit-button:hover {
          background: #2563eb;
        }

        .calls-list {
          flex: 1;
        }

        .list-title {
          margin: 0 0 1rem 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
        }

        .empty-calls {
          text-align: center;
          padding: 3rem 1rem;
          color: #9ca3af;
        }

        .empty-calls p {
          margin: 0.25rem 0;
        }

        .empty-subtitle {
          font-size: 0.875rem;
        }

        .call-item {
          background: white;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          margin-bottom: 0.75rem;
        }

        .call-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .call-status {
          font-size: 0.875rem;
          font-weight: 500;
          color: #1f2937;
        }

        .call-duration {
          font-size: 0.8125rem;
          color: #6b7280;
          background: #f3f4f6;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
        }

        .call-notes {
          margin: 0 0 0.75rem 0;
          font-size: 0.9375rem;
          color: #374151;
          line-height: 1.5;
        }

        .call-time {
          font-size: 0.75rem;
          color: #9ca3af;
        }

        /* Scrollbar styling */
        .call-log-panel::-webkit-scrollbar {
          width: 6px;
        }

        .call-log-panel::-webkit-scrollbar-track {
          background: transparent;
        }

        .call-log-panel::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }

        .call-log-panel::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}
