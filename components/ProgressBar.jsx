import React from 'react';

export default function ProgressBar({ current, goal }) {
  const percentage = goal > 0 ? Math.min((current / goal) * 100, 100) : 0;

  return (
    <div style={styles.background}>
      <div
        style={{ ...styles.fill, width: `${percentage}%` }}
      />
    </div>
  );
}

const styles = {
  background: {
    flex: 1,
    width: '100%',
    height: '16px',
    backgroundColor: '#e2e8f0',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: '8px',
    transition: 'width 0.3s ease-in-out',
  },
};