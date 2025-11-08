import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'home', label: 'Home', path: '/', icon: '🏠' },
    { id: 'profile', label: 'Profile', path: '/profile', icon: '👤' },
    { id: 'leads', label: 'Leads', path: '/leads', icon: '👥' },
    { id: 'history', label: 'History', path: '/history', icon: '📜' },
    { id: 'messages', label: 'Messages', path: '/followup', icon: '💬', badge: 3 },
    { id: 'discover', label: 'Discover', path: '/discover', icon: '✨' }
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div style={{
      width: '280px',
      height: '100vh',
      backgroundColor: '#ffffff',
      borderRight: '1px solid rgba(0,0,0,0.06)',
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 20px',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 40
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '40px',
          cursor: 'pointer',
          padding: '0 12px'
        }}
      >
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          fontWeight: '700',
          color: '#ffffff'
        }}>
          OL
        </div>
        <span style={{
          fontWeight: '700',
          fontSize: '18px',
          color: '#1a1a1a',
          letterSpacing: '-0.5px'
        }}>
          OMNI LEAD
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1 }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 16px',
                marginBottom: '4px',
                backgroundColor: active ? 'rgba(102, 126, 234, 0.08)' : 'transparent',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                position: 'relative',
                fontFamily: 'inherit'
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Active indicator */}
              {active && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '3px',
                  height: '24px',
                  backgroundColor: '#667eea',
                  borderRadius: '0 3px 3px 0'
                }} />
              )}

              <span style={{
                fontSize: '20px',
                filter: active ? 'none' : 'grayscale(100%)',
                opacity: active ? 1 : 0.7
              }}>
                {item.icon}
              </span>

              <span style={{
                fontSize: '15px',
                fontWeight: active ? '600' : '500',
                color: active ? '#667eea' : '#6b7280',
                flex: 1,
                textAlign: 'left'
              }}>
                {item.label}
              </span>

              {item.badge && (
                <span style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 7px',
                  borderRadius: '10px',
                  minWidth: '20px',
                  textAlign: 'center'
                }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Card - Workshop/Promo */}
      <div style={{
        backgroundColor: '#f8f9ff',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        borderRadius: '16px',
        padding: '20px',
        marginTop: '20px'
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          marginBottom: '12px'
        }}>
          🎯
        </div>
        <h3 style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#1a1a1a',
          marginBottom: '6px',
          margin: 0
        }}>
          Lead Workshop
        </h3>
        <p style={{
          fontSize: '13px',
          color: '#6b7280',
          marginBottom: '16px',
          lineHeight: '1.5',
          margin: '6px 0 16px 0'
        }}>
          Learn advanced lead management strategies
        </p>
        <button style={{
          width: '100%',
          padding: '10px 16px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Join Workshop
        </button>
      </div>
    </div>
  );
}
