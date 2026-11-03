import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { useApp } from '../context/AppContext';
import { friendlyError } from '../utils/friendlyError';
import { common } from '../styles/common';

export default function BookingsScreen({ navigation }) {
  // shared values come from Context, no prop drilling
  const { user, bookings, bookingsLoading, bookingsError, bookingCount } =
    useApp();
  const [message, setMessage] = useState('');

  // delete one of my own bookings
  async function cancelBooking(id) {
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'bookings', id));
      setMessage('');
    } catch (e) {
      setMessage(friendlyError(e));
    }
  }

  return (
    <View style={common.container}>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.count}>Bookings: {bookingCount}</Text>

      <View style={styles.row}>
        <Pressable
          style={[common.button, styles.half]}
          onPress={() => navigation.navigate('NewBooking')}
        >
          <Text style={common.buttonText}>New booking</Text>
        </Pressable>
        <Pressable
          style={[common.button, styles.half]}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={common.buttonText}>Profile</Text>
        </Pressable>
      </View>

      {message !== '' && <Text style={common.error}>{message}</Text>}

      {/* loading state */}
      {bookingsLoading && <ActivityIndicator style={styles.gap} />}

      {/* error state */}
      {!bookingsLoading && bookingsError !== '' && (
        <Text style={common.error}>{bookingsError}</Text>
      )}

      {!bookingsLoading && bookingsError === '' && (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          style={styles.gap}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.service}>{item.serviceType}</Text>
              <Text>Date: {item.preferredDate}</Text>
              <Text>Status: {item.status}</Text>
              {item.notes !== '' && <Text>Notes: {item.notes}</Text>}
              <Pressable onPress={() => cancelBooking(item.id)}>
                <Text style={styles.cancel}>Cancel booking</Text>
              </Pressable>
            </View>
          )}
          // empty state
          ListEmptyComponent={
            <Text style={styles.empty}>You have no bookings yet.</Text>
          }
        />
      )}

      <Pressable
        style={[common.button, common.buttonDanger]}
        onPress={() => signOut(auth)}
      >
        <Text style={common.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  email: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  count: {
    color: '#555',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    flex: 1,
    marginHorizontal: 4,
  },
  gap: {
    marginTop: 12,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  service: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancel: {
    color: '#c62828',
    marginTop: 6,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});