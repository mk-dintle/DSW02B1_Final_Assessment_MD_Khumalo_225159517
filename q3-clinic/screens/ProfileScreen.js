import { View, Text, Pressable } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useApp } from '../context/AppContext';
import { common } from '../styles/common';

export default function ProfileScreen() {
  // same shared values, no props passed in
  const { user, bookingCount } = useApp();

  return (
    <View style={common.container}>
      <Text style={common.title}>My Profile</Text>
      <Text>Email: {user.email}</Text>
      <Text>Total bookings: {bookingCount}</Text>

      <Pressable
        style={[common.button, common.buttonDanger]}
        onPress={() => signOut(auth)}
      >
        <Text style={common.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}