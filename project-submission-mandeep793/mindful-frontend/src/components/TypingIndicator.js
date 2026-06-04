import React from 'react';

const TypingIndicator = () => {
  const dotStyle = (delay) => ({
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: 'var(--accent-soft)',
    animation: `dotBounce 1.2s ease-in-out ${delay}s infinite`,
    display: 'inline-block',
  });

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '16px',
      animation: 'fadeUp 0.3s ease',
      padding: '4px 0',
    }}>
      {/* Avatar */}
      <div style={{
        width: '34px',
        height: '34px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-soft), var(--accent-warm))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        flexShrink: 0,
        animation: 'breathe 2s ease-in-out infinite',
      }}>
        🌿
      </div>

      {/* Bubble */}
      <div style={{
        background: 'var(--ai-bubble)',
        borderRadius: '18px 18px 18px 4px',
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        border: '1px solid rgba(126, 184, 164, 0.12)',
      }}>
        <div style={dotStyle(0)} />
        <div style={dotStyle(0.2)} />
        <div style={dotStyle(0.4)} />
      </div>
    </div>
  );
};

export default TypingIndicator;
