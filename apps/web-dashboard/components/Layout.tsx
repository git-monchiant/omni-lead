import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  currentPage?: 'leads' | 'chat' | 'calls' | 'settings';
}

export default function Layout({ children, currentPage }: LayoutProps) {
  const menuItems = [
    { id: 'leads', icon: '👥', label: 'Leads', path: '/leads' },
    { id: 'chat', icon: '💬', label: 'Chat', path: '/chat', badge: 3 },
    { id: 'calls', icon: '📞', label: 'Calls', path: '/calls' },
    { id: 'settings', icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{
        width: '240px',
        backgroundColor: '#1f2937',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #374151'
      }}>
        {/* Logo */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #374151'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{ fontSize: '28px' }}>💼</div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Omni Lead</div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>Follow-up System</div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1, padding: '16px 0' }}>
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 20px',
                color: currentPage === item.id ? 'white' : '#9ca3af',
                backgroundColor: currentPage === item.id ? '#374151' : 'transparent',
                textDecoration: 'none',
                transition: 'all 0.2s',
                borderLeft: currentPage === item.id ? '3px solid #3b82f6' : '3px solid transparent'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
              </div>
              {item.badge && (
                <span style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: '600',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* User Profile */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid #374151'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</div>
              <div style={{ fontSize: '14px', color: '#9ca3af' }}>admin@omni.com</div>
            </div>
            <button style={{
              background: 'none',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              fontSize: '20px'
            }}>
              ⋯
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Bar */}
        <div style={{
          height: '64px',
          backgroundColor: 'white',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <input
              type="text"
              placeholder="Search leads, chats..."
              style={{
                width: '300px',
                padding: '8px 16px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Notifications */}
            <button style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '8px'
            }}>
              🔔
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%'
              }} />
            </button>

            {/* Help */}
            <button style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '8px'
            }}>
              ❓
            </button>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
