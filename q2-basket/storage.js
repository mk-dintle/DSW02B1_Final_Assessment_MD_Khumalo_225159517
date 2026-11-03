import AsyncStorage from '@react-native-async-storage/async-storage';

// namespaced keys
const CACHE_KEY = 'mzansiBasket:cache';
const WATCH_KEY = 'mzansiBasket:watchlist';

// save the latest basket data
export async function saveCache(items) {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(items));
  } catch (e) {
    console.log('Could not save cache');
  }
}

// get the saved basket data (null if nothing saved)
export async function loadCache() {
  try {
    const saved = await AsyncStorage.getItem(CACHE_KEY);
    // first run: nothing saved yet
    return saved === null ? null : JSON.parse(saved);
  } catch (e) {
    return null;
  }
}

// save the watchlist (array of product ids)
export async function saveWatchlist(ids) {
  try {
    await AsyncStorage.setItem(WATCH_KEY, JSON.stringify(ids));
  } catch (e) {
    console.log('Could not save watchlist');
  }
}

// get the watchlist (empty array on first run)
export async function loadWatchlist() {
  try {
    const saved = await AsyncStorage.getItem(WATCH_KEY);
    return saved === null ? [] : JSON.parse(saved);
  } catch (e) {
    return [];
  }
}