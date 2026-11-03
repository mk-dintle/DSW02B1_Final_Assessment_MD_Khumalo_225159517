import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function RouteDetailsScreen({ route, navigation }) {
  // the route that was tapped on Home
  const { selectedRoute } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedRoute.mode}</Text>
      <Text style={styles.line}>From: {selectedRoute.from}</Text>
      <Text style={styles.line}>To: {selectedRoute.to}</Text>
      <Text style={styles.line}>Fare: R{selectedRoute.fare}</Text>
      <Text style={styles.line}>Status: {selectedRoute.status}</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('ReportIssue', { selectedRoute })}
      >
        <Text style={styles.buttonText}>Report a problem</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  line: {
    fontSize: 16,
    marginBottom: 6,
  },
  button: {
    backgroundColor: '#c62828',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});