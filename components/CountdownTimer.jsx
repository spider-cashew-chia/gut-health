import React, { useState, useEffect } from 'react';
import { ClockIcon } from './Icons.jsx';

const calculateTimeLeft = (deadline) => {
  const difference = deadline - new Date().getTime();
  let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const TimeValue = ({ value, label }) => (
    <div style={styles.timeValueContainer}>
        <span style={styles.timeValueText}>
            {String(value).padStart(2, '0')}
        </span>
        <span style={styles.timeValueLabel}>{label}</span>
    </div>
);

export default function CountdownTimer({ deadline }) {
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(deadline));
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <div style={styles.container}>
        <ClockIcon width={24} height={24} color="#10b981" />
        <div style={styles.timerValues}>
            <TimeValue value={timeLeft.days} label="Days" />
            <span style={styles.colon}>:</span>
            <TimeValue value={timeLeft.hours} label="Hours" />
            <span style={styles.colon}>:</span>
            <TimeValue value={timeLeft.minutes} label="Mins" />
            <span style={styles.colon}>:</span>
            <TimeValue value={timeLeft.seconds} label="Secs" />
        </div>
    </div>
  );
}

const styles = {
    container: {
        backgroundColor: '#f1f5f9',
        padding: '12px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
    },
    timerValues: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    timeValueContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    timeValueText: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#334155',
        lineHeight: 1,
    },
    timeValueLabel: {
        fontSize: '12px',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginTop: '4px',
    },
    colon: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#94a3b8',
        paddingBottom: '14px',
    }
};