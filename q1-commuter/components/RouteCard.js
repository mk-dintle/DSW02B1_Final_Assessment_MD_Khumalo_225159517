import { Pressable, Text, View, StyleSheet } from 'react-native';

// reusable card, data comes in through props
export default function RouteCard({ route, onPress }) {
  const delayed = route.status === 'Delayed';

  return (
    <Pressable
      style={[styles.card, delayed ? styles.delayedCard : styles.okCard]}
      onPress={onPress}
    >
      <Text style={styles.mode}>{route.mode}</Text>
      <Text style={styles.trip}>
        {route.from} → {route.to}
      </Text>
      <View style={styles.row}>
        <Text style={styles.fare}>R{route.fare}</Text>
        <Text style={delayed ? styles.delayedText : styles.okText}>
          {route.status}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 6,
  },
  okCard: {
    backgroundColor: '#e8f5e9',
    borderLeftColor: '#2e7d32',
  },
  delayedCard: {
    backgroundColor: '#fdecea',
    borderLeftColor: '#c62828',
  },
  mode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  trip: {
    marginVertical: 4,
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fare: {
    fontWeight: '600',
  },
  okText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  delayedText: {
    color: '#c62828',
    fontWeight: '600',
  },
});