import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { friendlyError } from '../utils/friendlyError';
import { common } from '../styles/common';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleLogin() {
    if (email.trim() === '' || password === '') {
      setError('Please enter your email and password.');
      return;
    }

    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (e) {
      setError(friendlyError(e));
      setBusy(false);
    }
  }

  return (
    <View style={common.container}>
      <Text style={common.title}>Clinic Bookings</Text>

      <TextInput
        style={common.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={common.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {error !== '' && <Text style={common.error}>{error}</Text>}

      <Pressable
        style={[common.button, busy && common.buttonDisabled]}
        onPress={handleLogin}
        disabled={busy}
      >
        <Text style={common.buttonText}>
          {busy ? 'Please wait...' : 'Login'}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Register')}>
        <Text style={common.link}>No account? Register</Text>
      </Pressable>
    </View>
  );
}