import React from 'react';
import { SearchIcon } from './Icons.jsx';

export default function SearchBar({ value, onChangeText, placeholder }) {
  return (
    <div style={styles.container}>
      <div style={styles.icon}>
        <SearchIcon width={20} height={20} color="#94a3b8" />
      </div>
      <input
        style={styles.input}
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '44px',
    paddingLeft: '40px',
    paddingRight: '16px',
    fontSize: '16px',
    backgroundColor: '#f1f5f9',
    borderRadius: '8px',
    border: '2px solid transparent',
    outline: 'none',
    color: '#334155',
  },
};