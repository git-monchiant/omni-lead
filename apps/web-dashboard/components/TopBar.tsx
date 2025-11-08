import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/', icon: '📊' },
    { id: 'leads', label: 'Leads', path: '/leads', icon: '👥' },
    { id: 'followup', label: 'Follow-up', path: '/followup', icon: '💬', badge: 3 }
  ];

  const notifications = [
    { id: 1, text: 'New lead from LINE', time: '2 min ago', unread: true },
    { id: 2, text: 'Follow-up scheduled', time: '15 min ago', unread: true },
    { id: 3, text: 'Lead converted', time: '1 hour ago', unread: false }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 32px',
        height: '72px',
        gap: '32px',
        maxWidth: '1920px',
        margin: '0 auto'
      }}>
        {/* Left: Logo and Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '48px', flexShrink: 0 }}>
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'opacity 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: '700',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}>
              OL
            </div>
            <span style={{
              fontWeight: '700',
              fontSize: '20px',
              background: 'linear-gradient(135deg, #1e293b 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '-0.5px'
            }}>
              OMNI LEAD
            </span>
          </div>

          {/* Navigation Menu */}
          <nav style={{ display: 'flex', gap: '4px' }}>
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: isActive(item.path) ? 'rgba(59, 130, 246, 0.08)' : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  color: isActive(item.path) ? '#3b82f6' : '#64748b',
                  fontWeight: isActive(item.path) ? '600' : '500',
                  fontSize: '15px',
                  transition: 'all 0.2s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                    e.currentTarget.style.color = '#1e293b';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path)) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#64748b';
                  }
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 7px',
                    borderRadius: '12px',
                    minWidth: '20px',
                    textAlign: 'center',
                    boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)'
                  }}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          {/* Search Button */}
          <button style={{
            padding: '10px 16px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e5e7eb',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            color: '#64748b',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s',
            minWidth: '200px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.backgroundColor = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.backgroundColor = '#f8fafc';
          }}>
            <span>🔍</span>
            <span>Search...</span>
            <span style={{
              marginLeft: 'auto',
              fontSize: '12px',
              padding: '2px 6px',
              backgroundColor: '#e5e7eb',
              borderRadius: '4px',
              color: '#64748b'
            }}>⌘K</span>
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                backgroundColor: showNotifications ? 'rgba(59, 130, 246, 0.08)' : '#f8fafc',
                border: showNotifications ? '1px solid #3b82f6' : '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'all 0.2s',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                if (!showNotifications) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }
              }}
              onMouseLeave={(e) => {
                if (!showNotifications) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              🔔
              <span style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                border: '2px solid #ffffff'
              }} />
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '320px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                zIndex: 100
              }}>
                <div style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid #e5e7eb',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontWeight: '600', fontSize: '14px', color: '#1e293b' }}>
                    Notifications
                  </span>
                  <span style={{
                    fontSize: '12px',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    Mark all read
                  </span>
                </div>
                <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '16px 20px',
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        backgroundColor: notif.unread ? '#f8fafc' : '#ffffff',
                        transition: 'background-color 0.2s',
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = notif.unread ? '#f8fafc' : '#ffffff'}
                    >
                      {notif.unread && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#3b82f6',
                          marginTop: '6px',
                          flexShrink: 0
                        }} />
                      )}
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '14px',
                          color: '#1e293b',
                          marginBottom: '4px',
                          fontWeight: notif.unread ? '500' : '400'
                        }}>
                          {notif.text}
                        </div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                          {notif.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{
                  padding: '12px 20px',
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#3b82f6',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}>
                    View all notifications
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{
            width: '1px',
            height: '32px',
            backgroundColor: '#e5e7eb'
          }} />

          {/* User Menu */}
          <div style={{ position: 'relative' }}>
            <div
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                padding: '6px 12px 6px 6px',
                borderRadius: '12px',
                backgroundColor: showUserMenu ? '#f8fafc' : 'transparent',
                transition: 'background-color 0.2s',
                border: showUserMenu ? '1px solid #e5e7eb' : '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                if (!showUserMenu) {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                }
              }}
              onMouseLeave={(e) => {
                if (!showUserMenu) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                color: '#ffffff',
                fontWeight: '700',
                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
              }}>
                A
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>
                  Admin User
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Administrator
                </div>
              </div>
              <span style={{
                fontSize: '16px',
                color: '#94a3b8',
                transition: 'transform 0.2s',
                transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)'
              }}>
                ▼
              </span>
            </div>

            {/* User Dropdown Menu */}
            {showUserMenu && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '220px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                zIndex: 100
              }}>
                <div style={{ padding: '8px' }}>
                  {[
                    { icon: '👤', label: 'Profile', action: () => {} },
                    { icon: '⚙️', label: 'Settings', action: () => {} },
                    { icon: '❓', label: 'Help & Support', action: () => {} }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.action}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#475569',
                        fontWeight: '500',
                        transition: 'background-color 0.2s',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8fafc';
                        e.currentTarget.style.color = '#1e293b';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#475569';
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  padding: '8px'
                }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#ef4444',
                      fontWeight: '500',
                      transition: 'background-color 0.2s',
                      textAlign: 'left'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
