import { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { friendlyError } from '../utils/friendlyError';
import { common } from '../styles/common';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleRegister() {
    if (email.trim() === '' || password === '') {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    setBusy(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      // create the user document (never the password)
      await setDoc(doc(db, 'users', result.user.uid), {
        email: result.user.email,
        createdAt: new Date().toISOString(),
      });
    } catch (e) {
      setError(friendlyError(e));
      setBusy(false);
    }
  }

  return (
    <View style={common.container}>
      <Text style={common.title}>Create account</Text>

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
      <TextInput
        style={common.input}
        placeholder="Confirm password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      {error !== '' && <Text style={common.error}>{error}</Text>}

      <Pressable
        style={[common.button, busy && common.buttonDisabled]}
        onPress={handleRegister}
        disabled={busy}
      >
        <Text style={common.buttonText}>
          {busy ? 'Please wait...' : 'Register'}
        </Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={common.link}>Already have an account? Login</Text>
      </Pressable>
    </View>
  );
}