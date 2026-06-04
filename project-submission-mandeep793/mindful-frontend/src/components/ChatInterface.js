import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import CrisisBanner from './CrisisBanner';
import { sendMessage } from '../services/api';
import { v4 as uuidv4 } from 'uuid';

const ChatInterface = ({ initialMessage }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(uuidv4());
  const [crisisMode, setCrisisMode] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  // Auto-send initial message if provided
  useEffect(() => {
    if (initialMessage) {
      handleSend(initialMessage);
    }
    // eslint-disable-next-line
  }, []);

  const formatMessagesForAPI = (msgs) =>
    msgs.map(m => ({ role: m.role, content: m.content }));

  const handleSend = async (text) => {
    const messageText = (text || input).trim();
    if (!messageText) return;

    setInput('');
    setError(null);

    const userMsg = {
      id: uuidv4(),
      role: 'user',
      content: messageText,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const allMessages = [...messages, userMsg];
      const result = await sendMessage(formatMessagesForAPI(allMessages), sessionId);

      if (result.crisisDetected) setCrisisMode(true);

      const aiMsg = {
        id: uuidv4(),
        role: 'assistant',
        content: result.message,
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setError('Connection lost. Please check that the backend is running on port 8080.');
      console.error(err);
    } finally {
      setIsTyping(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      maxWidth: '780px',
      margin: '0 auto',
      width: '100%',
    }}>
      {/* Header */}
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(24, 28, 39, 0.8)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent-soft), var(--accent-warm))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          boxShadow: '0 0 16px rgba(126, 184, 164, 0.3)',
          animation: 'breathe 3s ease-in-out infinite',
        }}>
          🌿
        </div>
        <div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '17px',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.2,
          }}>
            Solace
          </h2>
          <p style={{
            fontSize: '12px',
            color: 'var(--accent-soft)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent-soft)',
              display: 'inline-block',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            Here for you
          </p>
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Emergency: 112 &nbsp;|&nbsp; iCall: 9152987821
          </p>
        </div>
      </div>

      {/* Messages area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {/* Crisis banner */}
        {crisisMode && <CrisisBanner />}

        {/* Empty state */}
        {messages.length === 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            color: 'var(--text-muted)',
            fontSize: '14px',
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            gap: '8px',
          }}>
            <span style={{ fontSize: '28px', animation: 'breathe 3s ease infinite' }}>🌿</span>
            <p>Whatever you're feeling, I'm here to listen.</p>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            isUser={msg.role === 'user'}
          />
        ))}

        {/* Typing indicator */}
        {isTyping && <TypingIndicator />}

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(200, 80, 80, 0.1)',
            border: '1px solid rgba(200, 80, 80, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            fontSize: '13px',
            color: '#e88',
            animation: 'fadeUp 0.3s ease',
          }}>
            ⚠️ {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div style={{
        padding: '16px 20px 20px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(24, 28, 39, 0.9)',
        backdropFilter: 'blur(12px)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'flex-end',
          background: 'var(--bg-input)',
          borderRadius: '24px',
          padding: '10px 10px 10px 20px',
          border: '1px solid rgba(200, 169, 122, 0.15)',
          transition: 'border-color 0.2s ease',
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = 'rgba(200, 169, 122, 0.35)'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'rgba(200, 169, 122, 0.15)'}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Share what's on your mind..."
            disabled={isTyping}
            rows={1}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '15px',
              fontFamily: 'var(--font-sans)',
              resize: 'none',
              lineHeight: 1.6,
              maxHeight: '120px',
              overflowY: 'auto',
              paddingTop: '4px',
            }}
            onInput={e => {
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: input.trim() && !isTyping
                ? 'linear-gradient(135deg, var(--accent-soft), var(--accent-warm))'
                : 'rgba(255,255,255,0.06)',
              border: 'none',
              cursor: input.trim() && !isTyping ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.2s ease',
              fontSize: '16px',
            }}
          >
            {isTyping ? '⏳' : '↑'}
          </button>
        </div>
        <p style={{
          fontSize: '11px',
          color: 'var(--text-muted)',
          textAlign: 'center',
          marginTop: '10px',
        }}>
          Press Enter to send · Shift+Enter for new line · AI companion, not a therapist
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
