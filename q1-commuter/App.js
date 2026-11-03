import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RouteDetailsScreen from './screens/RouteDetailsScreen';
import ReportIssueScreen from './screens/ReportIssueScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Commuter Dashboard' }}
        />
        <Stack.Screen
          name="RouteDetails"
          component={RouteDetailsScreen}
          options={{ title: 'Route Details' }}
        />
        <Stack.Screen
          name="ReportIssue"
          component={ReportIssueScreen}
          options={{ title: 'Report a Problem' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}