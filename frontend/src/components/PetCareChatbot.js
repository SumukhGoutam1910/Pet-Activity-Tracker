import React from 'react';
import { Send } from 'lucide-react';

const PetCareChatbot = ({ messages, chatInput, setChatInput, sendMessage, loading, onClose }) => (
  <div className="chatbot" style={{ position: 'relative' }}>
    <button
      onClick={onClose}
      aria-label="Close chatbot"
      style={{
        position: 'absolute',
        top: 18,
        right: 18,
        width: 36,
        height: 36,
        background: 'red',
        border: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        outline: 'none',
      }}
    >
      <span style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', lineHeight: 1 }}>×</span>
    </button>
    <div className="chatbot-header">
      <span className="chatbot-title" style={{ background: '#FFD085', color: '#222', padding: '1.5rem', borderRadius: '25px', marginBottom: '1.5rem', fontWeight: 'bold', fontSize: '1.5rem', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>🐶 Pet Care Assistant</span>
    </div>
    <div className="chatbot-history">
      {messages.map((msg, i) => {
        const isFirstBotMsg = msg.sender === 'bot' && i === 0;
        return (
          <div key={i} className={msg.sender === 'user' ? 'chatbot-user' : 'chatbot-bot'}>
            <div
              className={msg.sender === 'user' ? 'chatbot-user-msg' : 'chatbot-bot-msg'}
              style={msg.sender === 'user' ? {
                background: '#3f34d1ff', // original blue
                color: '#fff',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(59,130,246,0.10)',
                fontWeight: 500,
                fontSize: '1.15em',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
              } : isFirstBotMsg ? {
                background: '#FFD085',
                color: '#222',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                fontWeight: 500,
                fontSize: '1.15em',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
              } : {
                background: '#FFD085',
                color: '#222',
                borderRadius: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                fontWeight: 500,
                fontSize: '1.15em',
                padding: '1.25rem',
                marginBottom: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{display: 'flex', alignItems: 'center'}}>
                <p style={{margin: 0}}>
                  {isFirstBotMsg
                    ? '🌈 Hi there! Welcome to your relaxing pet care space. I’m here to help you and your furry friend feel at ease. 🐾✨\nAsk me anything about your pet, and let’s make today a little brighter together!'
                    : msg.text}
                </p>
                <span style={{fontSize: '0.75em', color: '#888', marginLeft: 8}}>{msg.time ? msg.time : ''}</span>
              </div>
              {isFirstBotMsg && (
                <span style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, height: '4px',
                  background: 'linear-gradient(90deg, #f7b26a 0%, #f9d77e 100%)',
                  animation: 'shimmer 2s infinite linear',
                  opacity: 0.7
                }}></span>
              )}
            </div>
          </div>
        );
      })}
    </div>
    <div className="chatbot-input-row">
      <input
        type="text"
        value={chatInput}
        onChange={e => setChatInput(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage()}
        className="chatbot-input"
        placeholder="Type your question..."
      />
      <button
        onClick={sendMessage}
        className="chatbot-send"
        disabled={loading || !chatInput.trim()}
        style={{
          background: loading ? '#F7B7B7' : 'linear-gradient(90deg, #FF7E7E 0%, #FFB47E 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50px',
          padding: '0.75rem 2rem',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          transition: 'background 0.2s, transform 0.1s',
          marginLeft: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          transform: loading ? 'scale(1)' : 'scale(1.05)',
        }}
      >
        <Send />
        <span style={{ letterSpacing: '1px' }}>Send</span>
      </button>
    </div>
    <div style={{fontSize: '0.85em', color: '#aaa', marginTop: 8, textAlign: 'center'}}>
      Friendly advice only. For emergencies, contact your vet!
    </div>
    {/* Add keyframes for animation */}
    <style>{`
      @keyframes flashyFadeIn {
        0% { opacity: 0; transform: scale(0.95); }
        60% { opacity: 1; transform: scale(1.03); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes shimmer {
        0% { left: -100%; }
        100% { left: 100%; }
      }
    `}</style>
  </div>
);

export default PetCareChatbot;

