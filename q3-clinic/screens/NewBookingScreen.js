import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useApp } from '../context/AppContext';
import { friendlyError } from '../utils/friendlyError';
import { common } from '../styles/common';

const services = [
  'General Consultation',
  'Chronic Medicine Collection',
  'Immunisation Enquiry',
];

// date must look like 2026-11-20, be real, and not in the past
function isValidDate(text) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return false;
  const d = new Date(text);
  if (isNaN(d.getTime())) return false;
  if (d.toISOString().slice(0, 10) !== text) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d >= today;
}

export default function NewBookingScreen({ navigation }) {
  const { user } = useApp();
  const [serviceType, setServiceType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSave() {
    if (serviceType === '') {
      setError('Please choose a service type.');
      return;
    }
    if (!isValidDate(preferredDate)) {
      setError('Enter a valid future date as YYYY-MM-DD.');
      return;
    }

    setError('');
    setBusy(true);
    try {
      // saved under this user only
      await addDoc(collection(db, 'users', user.uid, 'bookings'), {
        serviceType: serviceType,
        preferredDate: preferredDate,
        notes: notes.trim(),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      });
      navigation.goBack();
    } catch (e) {
      setError(friendlyError(e));
      setBusy(false);
    }
  }

  return (
    <View style={common.container}>
      <Text style={common.title}>Book a service</Text>

      <View style={common.row}>
        {services.map((s) => (
          <Pressable
            key={s}
            style={[common.chip, serviceType === s && common.chipActive]}
            onPress={() => setServiceType(s)}
          >
            <Text
              style={serviceType === s ? common.chipTextOn : common.chipText}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={common.input}
        placeholder="Preferred date (YYYY-MM-DD)"
        value={preferredDate}
        onChangeText={setPreferredDate}
      />
      <TextInput
        style={common.input}
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
      />

      {error !== '' && <Text style={common.error}>{error}</Text>}

      <Pressable
        style={[common.button, busy && common.buttonDisabled]}
        onPress={handleSave}
        disabled={busy}
      >
        <Text style={common.buttonText}>
          {busy ? 'Saving...' : 'Save booking'}
        </Text>
      </Pressable>
    </View>
  );
}