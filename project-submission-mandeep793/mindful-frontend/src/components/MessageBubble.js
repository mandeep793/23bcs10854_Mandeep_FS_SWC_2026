import React from 'react';

const MessageBubble = ({ message, isUser }) => {
  const timeString = message.timestamp
    ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  if (isUser) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: '10px',
        animation: 'fadeUp 0.3s ease',
        padding: '2px 0',
      }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{
            background: 'var(--user-bubble)',
            borderRadius: '18px 18px 4px 18px',
            padding: '12px 18px',
            maxWidth: '480px',
            fontSize: '15px',
            lineHeight: 1.65,
            color: 'var(--text-primary)',
            border: '1px solid rgba(200, 169, 122, 0.1)',
          }}>
            {message.content}
          </div>
          <span style={{
            fontSize: '11px',
            color: 'var(--text-muted)',
            marginTop: '4px',
            display: 'block',
            paddingRight: '4px',
          }}>
            {timeString}
          </span>
        </div>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #3a4060, #2a3050)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '13px',
          flexShrink: 0,
          border: '1px solid rgba(200, 169, 122, 0.2)',
        }}>
          💙
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-end',
      gap: '12px',
      animation: 'fadeUp 0.35s ease',
      padding: '2px 0',
    }}>
      {/* Solace Avatar */}
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
        boxShadow: '0 0 12px rgba(126, 184, 164, 0.25)',
      }}>
        🌿
      </div>

      <div>
        <div style={{
          background: 'var(--ai-bubble)',
          borderRadius: '18px 18px 18px 4px',
          padding: '14px 20px',
          maxWidth: '520px',
          fontSize: '15px',
          lineHeight: 1.75,
          color: 'var(--text-primary)',
          border: '1px solid rgba(126, 184, 164, 0.12)',
          whiteSpace: 'pre-wrap',
          fontFamily: 'var(--font-sans)',
        }}>
          {message.content}
        </div>
        <span style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          marginTop: '4px',
          display: 'block',
          paddingLeft: '4px',
        }}>
          Solace · {timeString}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
