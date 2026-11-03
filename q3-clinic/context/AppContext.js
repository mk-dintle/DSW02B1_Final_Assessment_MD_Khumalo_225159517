import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { friendlyError } from '../utils/friendlyError';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState('');

  // Firebase tells us who is signed in (source of truth)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // real-time listener for this user's bookings only
  useEffect(() => {
    if (!user) {
      setBookings([]);
      setBookingsError('');
      return;
    }

    setBookingsLoading(true);
    const ref = collection(db, 'users', user.uid, 'bookings');

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        // newest first
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        setBookings(list);
        setBookingsError('');
        setBookingsLoading(false);
      },
      (error) => {
        setBookingsError(friendlyError(error));
        setBookingsLoading(false);
      }
    );

    // stop listening on logout / unmount
    return unsubscribe;
  }, [user]);

  // derived value, not stored separately
  const bookingCount = bookings.length;

  const value = {
    user,
    authLoading,
    bookings,
    bookingsLoading,
    bookingsError,
    bookingCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// small helper so screens can write useApp()
export function useApp() {
  return useContext(AppContext);
}