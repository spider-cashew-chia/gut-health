import React from 'react';
import ProgressBar from './ProgressBar.jsx';
import CountdownTimer from './CountdownTimer.jsx';
import { CloseIcon, RefreshCwIcon, LeafIcon } from './Icons.jsx';

const EatenListItem = ({ item, onRemoveItem }) => {
    return (
        <div style={styles.eatenItemContainer}>
            <span style={styles.eatenItemText}>{item.name}</span>
            <button onClick={() => onRemoveItem(item.id)} style={styles.removeItemButton} title="Remove">
                <CloseIcon width={16} height={16} color="#64748b" />
            </button>
        </div>
    );
};

export default function EatenList({ items, goal, onRemoveItem, deadline, onReset }) {
  const isGoalReached = items.length >= goal;

  return (
    <div style={styles.flexContainer}>
      <div style={styles.header}>
        <h2 style={styles.title}>Your Weekly Tally</h2>
        {items.length > 0 && (
          <button onClick={onReset} style={styles.resetButton}>
            <RefreshCwIcon width={16} height={16} color="#64748b" />
            <span style={styles.resetButtonText}>Reset</span>
          </button>
        )}
      </div>

      {deadline && <CountdownTimer deadline={deadline} />}

      <div style={styles.progressContainer}>
        <ProgressBar current={items.length} goal={goal} />
        <span style={styles.progressText}>{items.length} / {goal}</span>
      </div>

      {isGoalReached && (
        <div style={styles.goalReachedBanner}>
          <p style={styles.goalReachedText}>🎉 Congratulations! You've reached your weekly goal! 🎉</p>
        </div>
      )}

      <div style={styles.listContainer}>
        {items.length === 0 ? (
          <div style={styles.emptyContainer}>
            {/* <LeafIcon width={48} height={48} color="#cbd5e1" /> */}
            <p style={styles.emptyText}>Your list is empty.</p>
            <p style={styles.emptyText}>Add some fruits and veggies to get started!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {items.map(item => (
                <EatenListItem key={item.id} item={item} onRemoveItem={onRemoveItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
    flexContainer: { 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%' 
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
    },
    title: {
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#334155',
        margin: 0,
    },
    resetButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
    },
    resetButtonText: {
        color: '#64748b',
        fontWeight: '600',
        fontSize: '14px',
    },
    progressContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        margin: '16px 0',
    },
    progressText: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#475569',
        whiteSpace: 'nowrap',
    },
    goalReachedBanner: {
        backgroundColor: '#d1fae5',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '16px',
    },
    goalReachedText: {
        color: '#065f46',
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 0,
    },
    listContainer: {
        flex: 1,
    },
    emptyContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '40px',
    },
    emptyText: {
        color: '#64748b',
        marginTop: '8px',
        fontSize: '16px',
        margin: '4px 0',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        paddingBottom: '20px',
    },
    eatenItemContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    eatenItemText: {
        fontWeight: '600',
        color: '#1e293b',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        marginRight: '8px',
    },
    removeItemButton: {
        display: 'flex',
        padding: '4px',
        cursor: 'pointer',
        border: 'none',
        background: 'transparent',
        borderRadius: '4px',
    },
};