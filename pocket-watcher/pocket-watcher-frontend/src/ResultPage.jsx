import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const chartUrl = location.state?.chartUrl;

  const navButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
  };

  return (
    <div style={{ backgroundColor: 'rgb(255, 255, 255)', minHeight: '100vh', width: '100vw' }}>
      {/* Nav Bar */}
      <nav
        style={{
          width: '100%',
          borderBottom: '1px solid #ccc',
          backgroundColor: '#fff',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
          }}
        >
          <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Pocket Watcher</div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <button style={navButtonStyle}>Charts</button>
            <button style={navButtonStyle} onClick={() => navigate('/')}>
              Upload More
            </button>
            <button style={navButtonStyle}>Other</button>
          </div>
        </div>
      </nav>

      {/* Chart Display */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1.5rem' }}>
          Expense Chart
        </h2>

        {chartUrl ? (
          <div
            style={{
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '20px',
              padding: '2rem',
              maxWidth: '640px',
              width: '100%',
              margin: '0 auto',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
          >
            <img
              src={chartUrl}
              alt="Expense Chart"
              style={{
                width: '100%',
                borderRadius: '12px',
              }}
            />
          </div>
        ) : (
          <p>No chart data found.</p>
        )}
      </div>
    </div>
  );
}
