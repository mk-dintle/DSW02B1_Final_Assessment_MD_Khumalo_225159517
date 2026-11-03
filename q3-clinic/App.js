import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider, useApp } from './context/AppContext';
import { common } from './styles/common';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import BookingsScreen from './screens/BookingsScreen';
import NewBookingScreen from './screens/NewBookingScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  const { user, authLoading } = useApp();

  // wait for Firebase so Login does not flash
  if (authLoading) {
    return (
      <View style={common.centered}>
        <ActivityIndicator size="large" />
        <Text>Checking session...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? (
        // protected flow
        <Stack.Navigator>
          <Stack.Screen
            name="Bookings"
            component={BookingsScreen}
            options={{ title: 'My Bookings' }}
          />
          <Stack.Screen
            name="NewBooking"
            component={NewBookingScreen}
            options={{ title: 'New Booking' }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profile' }}
          />
        </Stack.Navigator>
      ) : (
        // signed-out flow
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Login' }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Create Account' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}