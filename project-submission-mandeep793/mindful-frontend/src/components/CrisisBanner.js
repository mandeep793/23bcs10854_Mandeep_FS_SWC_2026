import React from 'react';

const CrisisBanner = () => {
  return (
    <div style={{
      background: 'var(--crisis-bg)',
      border: '1px solid var(--crisis-border)',
      borderRadius: 'var(--radius-sm)',
      padding: '14px 18px',
      margin: '0 0 12px 0',
      animation: 'fadeUp 0.4s ease',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
      }}>
        <span style={{ fontSize: '18px', flexShrink: 0 }}>🤝</span>
        <div>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '14px',
            color: '#e88888',
            fontWeight: 500,
            marginBottom: '6px',
          }}>
            You're not alone — immediate help is available
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-primary)' }}>iCall (India):</strong>{' '}
            <a href="tel:9152987821" style={{ color: 'var(--accent-warm)', textDecoration: 'none' }}>
              9152987821
            </a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <strong style={{ color: 'var(--text-primary)' }}>Vandrevala Foundation:</strong>{' '}
            <a href="tel:18602662345" style={{ color: 'var(--accent-warm)', textDecoration: 'none' }}>
              1860-2662-345
            </a>{' '}
            <span style={{ fontSize: '11px', opacity: 0.7 }}>(24/7)</span>
          </p>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            International: Text HOME to 741741 (Crisis Text Line)
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrisisBanner;
