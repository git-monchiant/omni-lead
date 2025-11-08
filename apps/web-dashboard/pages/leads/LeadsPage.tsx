import { useState } from 'react';
import { useFilters } from '../../contexts/FilterContext';
import SubHeader from '../../components/SubHeader';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'form' | 'chat';
  channel?: 'line' | 'facebook' | 'whatsapp'; // สำหรับ chat source
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  project?: string; // โครงการที่สนใจ (อาจไม่ระบุ)
  lastActivity: string;
  notes: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');

  // Use global filters from context
  const {
    dateFrom,
    dateTo,
    selectedProject,
    selectedSource,
    selectedStatus,
    showDuplicates,
    setShowDuplicates
  } = useFilters();

  // Mock data
  const leads: Lead[] = [
    {
      id: '1',
      name: 'สมชาย ใจดี',
      phone: '081-234-5678',
      email: 'somchai@email.com',
      source: 'form',
      status: 'new',
      project: 'บ้านกลางเมือง',
      lastActivity: '2024-01-15 10:30',
      notes: 'สนใจบ้านเดี่ยว 3 ห้องนอน',
      createdAt: '2024-01-15 10:30'
    },
    {
      id: '2',
      name: 'สมหญิง รักสุข',
      phone: '082-345-6789',
      email: '',
      source: 'chat',
      channel: 'line',
      status: 'contacted',
      project: 'เดอะ ริเวอร์ไซด์',
      lastActivity: '2024-01-15 09:15',
      notes: 'ถามราคาคอนโด 2 ห้องนอน',
      createdAt: '2024-01-14 15:20'
    },
    {
      id: '3',
      name: 'วิชัย มั่นคง',
      phone: '083-456-7890',
      email: '',
      source: 'chat',
      channel: 'facebook',
      status: 'qualified',
      project: 'บ้านกลางเมือง',
      lastActivity: '2024-01-14 16:45',
      notes: 'พร้อม close deal ทาวน์เฮาส์',
      createdAt: '2024-01-13 11:00'
    },
    {
      id: '4',
      name: 'มานี ศรีสุข',
      phone: '084-567-8901',
      email: 'manee@email.com',
      source: 'form',
      status: 'new',
      project: undefined, // ยังไม่ระบุโครงการ
      lastActivity: '2024-01-14 14:20',
      notes: 'กรอกข้อมูลจาก landing page',
      createdAt: '2024-01-14 14:20'
    },
    {
      id: '5',
      name: 'ประยุทธ์ ดีงาม',
      phone: '085-678-9012',
      email: '',
      source: 'chat',
      channel: 'whatsapp',
      status: 'contacted',
      project: 'เดอะ ริเวอร์ไซด์',
      lastActivity: '2024-01-13 18:30',
      notes: 'นัดดูห้องตัวอย่าง',
      createdAt: '2024-01-13 10:15'
    },
    {
      id: '6',
      name: 'สุดา แสงทอง',
      phone: '086-789-0123',
      email: 'suda@email.com',
      source: 'form',
      status: 'contacted',
      project: 'ปาร์ควิว คอนโด',
      lastActivity: '2024-01-13 15:00',
      notes: 'สนใจคอนโดใกล้ BTS',
      createdAt: '2024-01-13 15:00'
    },
    {
      id: '7',
      name: 'จิตร สมบูรณ์',
      phone: '087-890-1234',
      email: '',
      source: 'chat',
      channel: 'line',
      status: 'new',
      project: undefined, // ยังไม่ระบุโครงการ
      lastActivity: '2024-01-12 11:30',
      notes: 'สอบถามข้อมูลเบื้องต้น',
      createdAt: '2024-01-12 11:30'
    }
  ];


  // Detect duplicates (by phone or email)
  const detectDuplicates = () => {
    const phoneMap = new Map<string, Lead[]>();
    const emailMap = new Map<string, Lead[]>();

    leads.forEach(lead => {
      // Group by phone
      if (lead.phone) {
        const existing = phoneMap.get(lead.phone) || [];
        phoneMap.set(lead.phone, [...existing, lead]);
      }
      // Group by email
      if (lead.email) {
        const existing = emailMap.get(lead.email) || [];
        emailMap.set(lead.email, [...existing, lead]);
      }
    });

    const duplicateIds = new Set<string>();
    phoneMap.forEach(group => {
      if (group.length > 1) {
        group.forEach(lead => duplicateIds.add(lead.id));
      }
    });
    emailMap.forEach(group => {
      if (group.length > 1) {
        group.forEach(lead => duplicateIds.add(lead.id));
      }
    });

    return duplicateIds;
  };

  const duplicateIds = detectDuplicates();

  const filteredLeads = leads.filter(lead => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        lead.name.toLowerCase().includes(query) ||
        lead.phone.includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.notes.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Date range filter
    if (dateFrom) {
      const leadDate = new Date(lead.createdAt).toISOString().split('T')[0];
      if (leadDate < dateFrom) return false;
    }
    if (dateTo) {
      const leadDate = new Date(lead.createdAt).toISOString().split('T')[0];
      if (leadDate > dateTo) return false;
    }

    // Duplicate filter
    if (showDuplicates && !duplicateIds.has(lead.id)) return false;

    // Other filters
    if (selectedSource !== 'all' && lead.source !== selectedSource) return false;
    if (selectedStatus !== 'all' && lead.status !== selectedStatus) return false;
    if (selectedProject !== 'all') {
      if (selectedProject === 'unspecified' && lead.project !== undefined) return false;
      if (selectedProject !== 'unspecified' && lead.project !== selectedProject) return false;
    }
    return true;
  });

  const toggleSelectLead = (leadId: string) => {
    const newSelected = new Set(selectedLeads);
    if (newSelected.has(leadId)) {
      newSelected.delete(leadId);
    } else {
      newSelected.add(leadId);
    }
    setSelectedLeads(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedLeads.size === filteredLeads.length) {
      setSelectedLeads(new Set());
    } else {
      setSelectedLeads(new Set(filteredLeads.map(l => l.id)));
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      new: '#3b82f6',
      contacted: '#f59e0b',
      qualified: '#10b981',
      converted: '#8b5cf6',
      lost: '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusText = (status: string) => {
    const texts = {
      new: 'ใหม่',
      contacted: 'ติดต่อแล้ว',
      qualified: 'มีคุณสมบัติ',
      converted: 'ปิดการขาย',
      lost: 'เสียโอกาส'
    };
    return texts[status] || status;
  };

  const getChannelIcon = (channel?: string) => {
    switch (channel) {
      case 'line': return '💚';
      case 'facebook': return '💙';
      case 'whatsapp': return '💬';
      default: return '📝';
    }
  };

  const stats = [
    {
      icon: '👥',
      label: 'Total',
      value: leads.length
    }
  ];

  if (duplicateIds.size > 0) {
    stats.push({
      icon: '⚠️',
      label: 'Duplicates',
      value: duplicateIds.size,
      onClick: () => setShowDuplicates(!showDuplicates),
      isActive: showDuplicates,
      variant: 'warning' as const
    });
  }

  return (
    <div style={{ padding: '32px', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <SubHeader
        title="Leads"
        subtitle={`${filteredLeads.length} of ${leads.length} leads`}
        stats={stats}
      />

      {/* Leads Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Name</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Contact</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Project</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Source</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Last Activity</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Notes</th>
              <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#475569' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead, index) => {
              const isDuplicate = duplicateIds.has(lead.id);
              return (
              <tr
                key={lead.id}
                style={{
                  borderBottom: index < filteredLeads.length - 1 ? '1px solid #f1f5f9' : 'none',
                  backgroundColor: isDuplicate ? '#fef3c7' : '#ffffff'
                }}
              >
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{lead.name}</div>
                    {isDuplicate && (
                      <span style={{
                        fontSize: '10px',
                        padding: '3px 6px',
                        backgroundColor: '#fbbf24',
                        color: '#ffffff',
                        borderRadius: '4px',
                        fontWeight: '700'
                      }}>
                        DUP
                      </span>
                    )}
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                  <div>{lead.phone}</div>
                  {lead.email && <div style={{ fontSize: '14px' }}>{lead.email}</div>}
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  {lead.project ? (
                    <span style={{
                      padding: '6px 12px',
                      backgroundColor: '#dbeafe',
                      color: '#1e40af',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {lead.project}
                    </span>
                  ) : (
                    <span style={{
                      padding: '6px 12px',
                      backgroundColor: '#f8fafc',
                      color: '#94a3b8',
                      borderRadius: '6px',
                      fontSize: '14px'
                    }}>
                      Not specified
                    </span>
                  )}
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{lead.source === 'form' ? '📝' : getChannelIcon(lead.channel)}</span>
                    <span style={{ color: '#64748b', fontWeight: '500' }}>
                      {lead.source === 'form' ? 'Form' : `${lead.channel?.toUpperCase()}`}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: getStatusColor(lead.status) + '15',
                    color: getStatusColor(lead.status)
                  }}>
                    {getStatusText(lead.status)}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b' }}>
                  {lead.lastActivity}
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#64748b', maxWidth: '200px' }}>
                  {lead.notes}
                </td>
                <td style={{ padding: '16px', fontSize: '14px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {lead.source === 'chat' ? (
                      <button style={{
                        padding: '8px 16px',
                        backgroundColor: '#3b82f6',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}>
                        Chat
                      </button>
                    ) : (
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
                    )}
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#f8fafc',
                      color: '#475569',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      View
                    </button>
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
