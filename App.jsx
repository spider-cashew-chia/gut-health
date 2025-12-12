import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { FRUITS_AND_VEGETABLES } from './constants.js';
import SearchBar from './components/SearchBar.jsx';
import FruitAndVegList from './components/FruitAndVegList.jsx';
import EatenList from './components/EatenList.jsx';
import { LeafIcon } from './components/Icons.jsx';
import { fetchAppSettings } from './src/lib/sanityQueries.js';
// test

const WEEKLY_GOAL = 20;
const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;

export default function App() {
  const [eatenItems, setEatenItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [countdownDeadline, setCountdownDeadline] = useState(null);
  // State for app title from Sanity
  const [appTitle, setAppTitle] = useState('Gut Health Tracker');

  // Fetch app settings from Sanity on mount
  useEffect(() => {
    const loadAppSettings = async () => {
      try {
        const settings = await fetchAppSettings();
        if (settings && settings.title) {
          setAppTitle(settings.title);
        }
      } catch (error) {
        console.error('Failed to fetch app settings from Sanity:', error);
        // Keep default title on error
      }
    };
    loadAppSettings();
  }, []);

  useEffect(() => {
    try {
      const storedDeadline = localStorage.getItem('countdownDeadline');
      if (storedDeadline) {
        const deadline = parseInt(storedDeadline, 10);
        if (deadline > Date.now()) {
          setCountdownDeadline(deadline);
          const storedItems = localStorage.getItem('eatenItems');
          if (storedItems) {
            setEatenItems(JSON.parse(storedItems));
          }
        } else {
          localStorage.removeItem('eatenItems');
          localStorage.removeItem('countdownDeadline');
        }
      }
    } catch (error) {
      console.error('Failed to load data from localStorage', error);
    }
  }, []);

  const handleReset = useCallback(() => {
    const reset = () => {
      setEatenItems([]);
      setCountdownDeadline(null);
      localStorage.removeItem('eatenItems');
      localStorage.removeItem('countdownDeadline');
    };

    if (eatenItems.length > 0) {
      if (
        window.confirm(
          'Are you sure you want to reset your weekly tally? This action cannot be undone.'
        )
      ) {
        reset();
      }
    } else {
      reset();
    }
  }, [eatenItems.length]);

  useEffect(() => {
    if (!countdownDeadline) return;

    const interval = setInterval(() => {
      if (Date.now() >= countdownDeadline) {
        handleReset();
        alert(
          "Time's up! Your weekly tally has been reset. Great job, let's start a new week!"
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownDeadline, handleReset]);

  const handleAddItem = useCallback(
    (item) => {
      if (eatenItems.some((eatenItem) => eatenItem.id === item.id)) {
        return;
      }
      setSearchTerm('');

      let currentDeadline = countdownDeadline;
      if (eatenItems.length === 0) {
        const newDeadline = Date.now() + SEVEN_DAYS_IN_MS;
        setCountdownDeadline(newDeadline);
        localStorage.setItem('countdownDeadline', newDeadline.toString());
        currentDeadline = newDeadline;
      }

      if (currentDeadline) {
        const newItems = [...eatenItems, item];
        setEatenItems(newItems);
        localStorage.setItem('eatenItems', JSON.stringify(newItems));
      }
    },
    [eatenItems, countdownDeadline]
  );

  const handleSuggestItem = useCallback(() => {
    if (!searchTerm.trim()) return;
    alert(
      `Thank you for your suggestion: "${searchTerm}". We will review it for inclusion in our list!`
    );
    setSearchTerm('');
  }, [searchTerm]);

  const handleRemoveItem = useCallback(
    (itemId) => {
      const newItems = eatenItems.filter((item) => item.id !== itemId);
      setEatenItems(newItems);

      if (newItems.length === 0) {
        setCountdownDeadline(null);
        localStorage.removeItem('eatenItems');
        localStorage.removeItem('countdownDeadline');
      } else {
        localStorage.setItem('eatenItems', JSON.stringify(newItems));
      }
    },
    [eatenItems]
  );

  const filteredItems = useMemo(() => {
    if (!searchTerm) {
      return [];
    }
    const eatenIds = new Set(eatenItems.map((item) => item.id));
    return FRUITS_AND_VEGETABLES.filter(
      (item) =>
        !eatenIds.has(item.id) &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 10);
  }, [searchTerm, eatenItems]);

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>
            {/* <LeafIcon width={32} height={32} color="#10b981" /> */}
            <h1 style={styles.title}>{appTitle}</h1>
          </div>
          <p style={styles.subtitle}>
            Aim to eat{' '}
            <span style={styles.boldSubtitle}>{WEEKLY_GOAL} different</span>{' '}
            fruits and vegetables each week.
          </p>
        </header>

        <main style={styles.mainContent}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Add an Item</h2>
            <SearchBar
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholder='Type a fruit or vegetable...'
            />
            <FruitAndVegList
              items={filteredItems}
              onItemClick={handleAddItem}
              searchTerm={searchTerm}
              onSuggestItem={handleSuggestItem}
            />
          </div>

          <div style={styles.card}>
            <EatenList
              items={eatenItems}
              goal={WEEKLY_GOAL}
              onRemoveItem={handleRemoveItem}
              deadline={countdownDeadline}
              onReset={handleReset}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    maxWidth: '600px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px',
    marginTop: '16px',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1e293b',
    letterSpacing: '-0.5px',
    margin: 0,
  },
  subtitle: {
    marginTop: '8px',
    fontSize: '16px',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 1.5,
  },
  boldSubtitle: {
    fontWeight: 'bold',
    color: '#10b981',
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    paddingBottom: '24px',
  },
  card: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: '16px',
    marginTop: 0,
  },
};
