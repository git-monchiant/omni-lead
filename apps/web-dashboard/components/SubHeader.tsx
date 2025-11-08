import { ReactNode } from 'react';

interface SubHeaderProps {
  title: string;
  subtitle?: string;
  stats?: Array<{
    icon: string;
    label: string;
    value: number | string;
    onClick?: () => void;
    isActive?: boolean;
    variant?: 'default' | 'warning' | 'success' | 'purple' | 'danger';
    trend?: {
      value: string;
      isPositive: boolean;
    };
  }>;
  actions?: ReactNode;
}

export default function SubHeader({ title, subtitle, stats, actions }: SubHeaderProps) {
  const getVariantStyle = (variant?: string, isActive?: boolean) => {
    switch (variant) {
      case 'warning':
        return {
          bg: isActive ? 'rgba(245, 158, 11, 0.12)' : 'rgba(245, 158, 11, 0.08)',
          iconBg: 'rgba(245, 158, 11, 0.2)',
          borderColor: isActive ? '#f59e0b' : 'rgba(245, 158, 11, 0.2)',
          color: '#f59e0b'
        };
      case 'success':
        return {
          bg: isActive ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.08)',
          iconBg: 'rgba(16, 185, 129, 0.2)',
          borderColor: isActive ? '#10b981' : 'rgba(16, 185, 129, 0.2)',
          color: '#10b981'
        };
      case 'purple':
        return {
          bg: isActive ? 'rgba(139, 92, 246, 0.12)' : 'rgba(139, 92, 246, 0.08)',
          iconBg: 'rgba(139, 92, 246, 0.2)',
          borderColor: isActive ? '#8b5cf6' : 'rgba(139, 92, 246, 0.2)',
          color: '#8b5cf6'
        };
      case 'danger':
        return {
          bg: isActive ? 'rgba(239, 68, 68, 0.12)' : 'rgba(239, 68, 68, 0.08)',
          iconBg: 'rgba(239, 68, 68, 0.2)',
          borderColor: isActive ? '#ef4444' : 'rgba(239, 68, 68, 0.2)',
          color: '#ef4444'
        };
      default:
        return {
          bg: isActive ? 'rgba(59, 130, 246, 0.12)' : '#ffffff',
          iconBg: 'rgba(59, 130, 246, 0.15)',
          borderColor: isActive ? '#3b82f6' : '#e5e7eb',
          color: '#3b82f6'
        };
    }
  };

  return (
    <div style={{
      marginBottom: '32px'
    }}>
      {/* Title and Subtitle */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: stats ? '24px' : '0'
      }}>
        <div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '6px',
            letterSpacing: '-0.5px'
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: '15px',
              color: '#64748b',
              margin: 0,
              fontWeight: '500'
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Custom Actions */}
        {actions && (
          <div>
            {actions}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      {stats && (
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'stretch',
          flexWrap: 'wrap'
        }}>
          {stats.map((stat, index) => {
            const variantStyle = getVariantStyle(stat.variant, stat.isActive);

            return (
              <div
                key={index}
                onClick={stat.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '18px 20px',
                  backgroundColor: variantStyle.bg,
                  borderRadius: '12px',
                  border: `2px solid ${variantStyle.borderColor}`,
                  cursor: stat.onClick ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                  minWidth: '180px',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (stat.onClick) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (stat.onClick) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: variantStyle.iconBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  flexShrink: 0
                }}>
                  {stat.icon}
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    fontWeight: '600',
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    color: '#1e293b',
                    letterSpacing: '-0.5px',
                    marginBottom: stat.trend ? '4px' : '0'
                  }}>
                    {stat.value}
                  </div>
                  {stat.trend && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: stat.trend.isPositive ? '#10b981' : '#ef4444'
                    }}>
                      <span style={{ fontSize: '14px' }}>
                        {stat.trend.isPositive ? '↗' : '↘'}
                      </span>
                      <span>{stat.trend.value}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
