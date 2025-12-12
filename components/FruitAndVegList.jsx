import React from 'react';

export default function FruitAndVegList({ items, onItemClick, searchTerm, onSuggestItem }) {
  if (items.length === 0) {
    return (
      <div style={styles.container}>
        {searchTerm.trim() ? (
          <div style={styles.centeredContainer}>
            <p style={styles.placeholderText}>"{searchTerm}" is not on our list.</p>
            <button onClick={onSuggestItem} style={styles.suggestButton}>
              Suggest adding it?
            </button>
          </div>
        ) : (
          <div style={styles.centeredContainer}>
            <p style={styles.placeholderText}>Start typing to find an item.</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={styles.listContainer} className="no-scrollbar">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onItemClick(item)}
          style={styles.itemButton}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    marginTop: '16px',
    height: '256px',
    display: 'flex',
    flexDirection: 'column',
  },
  listContainer: {
    marginTop: '16px',
    height: '256px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  centeredContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  placeholderText: {
    color: '#64748b',
    fontSize: '16px',
    margin: 0,
  },
  suggestButton: {
    marginTop: '16px',
    backgroundColor: '#10b981',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
  },
  itemButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    textAlign: 'left',
    fontSize: '16px',
    color: '#334155',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};