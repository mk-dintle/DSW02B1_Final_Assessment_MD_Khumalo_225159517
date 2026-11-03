import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { API_URL } from './apiConfig';
import {
  saveCache,
  loadCache,
  saveWatchlist,
  loadWatchlist,
} from './storage';
import BasketItemCard from './components/BasketItemCard';

// turn one raw JSON object into the shape the app uses
function toItem(raw) {
  return {
    id: raw.id,
    name: raw.name,
    category: raw.category,
    store: raw.store,
    province: raw.province,
    area: raw.area,
    price: Number(raw.price),
  };
}

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [source, setSource] = useState('live'); // 'live' or 'cached'
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState('');
  const [watchlist, setWatchlist] = useState([]);
  const [showWatchOnly, setShowWatchOnly] = useState(false);

  // get data from the API, fall back to the saved copy
  async function loadBasket() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_URL);
      // check the HTTP request worked
      if (!response.ok) {
        throw new Error('Server error ' + response.status);
      }
      const json = await response.json();
      const cleaned = json.map(toItem);

      setItems(cleaned);
      setSource('live');
      // only cache real data, never an empty list
      if (cleaned.length > 0) {
        await saveCache(cleaned);
      }
    } catch (e) {
      // request failed: try the saved copy
      const cached = await loadCache();
      if (cached && cached.length > 0) {
        setItems(cached);
        setSource('cached');
      } else {
        setError('Could not load data and no saved copy is available.');
      }
    } finally {
      setLoading(false);
    }
  }

  // runs once when the app opens
  useEffect(() => {
    loadBasket();
    loadWatchlist().then(setWatchlist);
  }, []);

  // add or remove a product from the watchlist
  function toggleWatch(id) {
    let next;
    if (watchlist.includes(id)) {
      next = watchlist.filter((w) => w !== id);
    } else {
      // includes() check above stops duplicates
      next = [...watchlist, id];
    }
    setWatchlist(next);
    saveWatchlist(next);
  }

  const categories = ['All', ...new Set(items.map((i) => i.category))];

  // search, category, max price and watchlist all work together
  const visible = items.filter((i) => {
    const nameOk = i.name.toLowerCase().includes(search.toLowerCase());
    const catOk = category === 'All' || i.category === category;
    const priceOk = maxPrice === '' || i.price <= Number(maxPrice);
    const watchOk = !showWatchOnly || watchlist.includes(i.id);
    return nameOk && catOk && priceOk && watchOk;
  });

  const total = visible.reduce((sum, i) => sum + i.price, 0);
  const average = visible.length === 0 ? 0 : total / visible.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mzansi Basket Watch</Text>

      {/* loading state */}
      {loading && <ActivityIndicator size="large" style={styles.gap} />}

      {/* failure state */}
      {!loading && error !== '' && (
        <View>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.retry} onPress={loadBasket}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </View>
      )}

      {!loading && error === '' && (
        <View style={styles.flex}>
          {/* live vs cached state */}
          {source === 'cached' ? (
            <Text style={styles.cached}>
              Offline: showing saved data from your last visit
            </Text>
          ) : (
            <Text style={styles.live}>Live data</Text>
          )}

          <TextInput
            style={styles.input}
            placeholder="Search products"
            value={search}
            onChangeText={setSearch}
          />
          <TextInput
            style={styles.input}
            placeholder="Maximum price (R)"
            keyboardType="numeric"
            value={maxPrice}
            onChangeText={setMaxPrice}
          />

          <FlatList
            horizontal
            data={categories}
            keyExtractor={(c) => c}
            style={styles.catList}
            renderItem={({ item: c }) => (
              <Pressable
                style={[styles.chip, category === c && styles.chipActive]}
                onPress={() => setCategory(c)}
              >
                <Text
                  style={category === c ? styles.chipTextOn : styles.chipText}
                >
                  {c}
                </Text>
              </Pressable>
            )}
          />

          <Pressable onPress={() => setShowWatchOnly(!showWatchOnly)}>
            <Text style={styles.link}>
              {showWatchOnly
                ? 'Show all products'
                : 'Show watchlist only (' + watchlist.length + ')'}
            </Text>
          </Pressable>

          <Text style={styles.summary}>
            {visible.length} results • Average R{average.toFixed(2)}
          </Text>

          <FlatList
            data={visible}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <BasketItemCard
                item={item}
                watched={watchlist.includes(item.id)}
                onToggleWatch={() => toggleWatch(item.id)}
              />
            )}
            // no results state
            ListEmptyComponent={
              <Text style={styles.empty}>No products match your filters.</Text>
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  flex: {
    flex: 1,
  },
  gap: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  live: {
    color: '#2e7d32',
    marginBottom: 6,
  },
  cached: {
    backgroundColor: '#fff3cd',
    color: '#8a6d3b',
    padding: 8,
    borderRadius: 6,
    marginBottom: 6,
  },
  error: {
    color: '#c62828',
    marginVertical: 10,
  },
  retry: {
    backgroundColor: '#1565c0',
    padding: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  catList: {
    flexGrow: 0,
    marginBottom: 8,
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#1565c0',
  },
  chipText: {
    color: '#333',
  },
  chipTextOn: {
    color: '#fff',
    fontWeight: 'bold',
  },
  link: {
    color: '#1565c0',
    marginBottom: 6,
  },
  summary: {
    fontWeight: '600',
    marginBottom: 8,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
});