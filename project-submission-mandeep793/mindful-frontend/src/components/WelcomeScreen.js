import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  const prompts = [
    "I've been feeling really overwhelmed lately...",
    "I just need someone to talk to right now",
    "I don't know how to handle what I'm going through",
    "I feel like no one understands me",
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '40px 24px',
      animation: 'fadeUp 0.6s ease',
    }}>
      {/* Logo mark */}
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--accent-soft) 0%, var(--accent-warm) 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        marginBottom: '28px',
        boxShadow: '0 0 40px rgba(126, 184, 164, 0.3)',
        animation: 'breathe 3s ease-in-out infinite',
      }}>
        🌿
      </div>

      <h1 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '36px',
        fontWeight: 400,
        color: 'var(--text-primary)',
        marginBottom: '10px',
        letterSpacing: '-0.5px',
      }}>
        Solace
      </h1>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: '16px',
        color: 'var(--accent-warm)',
        marginBottom: '24px',
        opacity: 0.9,
      }}>
        A safe space to be heard
      </p>

      <p style={{
        fontSize: '15px',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        maxWidth: '400px',
        lineHeight: 1.75,
        marginBottom: '36px',
      }}>
        Whatever you're carrying right now — you don't have to carry it alone.
        I'm here to listen, without judgment, without interruption.
      </p>

      {/* Prompt suggestions */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%',
        maxWidth: '420px',
        marginBottom: '32px',
      }}>
        <p style={{
          fontSize: '12px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginBottom: '4px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}>
          You might start with...
        </p>
        {prompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => onStart(prompt)}
            style={{
              background: 'var(--bg-input)',
              border: '1px solid rgba(200, 169, 122, 0.15)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 16px',
              color: 'var(--text-secondary)',
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'left',
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              transition: 'all 0.2s ease',
              lineHeight: 1.5,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(200, 169, 122, 0.4)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.background = 'rgba(200, 169, 122, 0.06)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(200, 169, 122, 0.15)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.background = 'var(--bg-input)';
            }}
          >
            "{prompt}"
          </button>
        ))}
      </div>

      <button
        onClick={() => onStart('')}
        style={{
          background: 'linear-gradient(135deg, var(--accent-soft), var(--accent-warm))',
          border: 'none',
          borderRadius: '50px',
          padding: '14px 40px',
          color: '#0f1117',
          fontSize: '15px',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.3px',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.opacity = '0.9';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.opacity = '1';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        Begin talking
      </button>

      <p style={{
        fontSize: '12px',
        color: 'var(--text-muted)',
        marginTop: '24px',
        textAlign: 'center',
        maxWidth: '340px',
        lineHeight: 1.6,
      }}>
        This is an AI companion and not a replacement for professional help.
        If you're in immediate danger, please call emergency services.
      </p>
    </div>
  );
};

export default WelcomeScreen;
