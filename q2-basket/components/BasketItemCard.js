import { View, Text, Pressable, StyleSheet } from 'react-native';

// one product card, data comes in through props
export default function BasketItemCard({ item, watched, onToggleWatch }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.small}>{item.category}</Text>
        <Text style={styles.small}>
          {item.store} • {item.area}, {item.province}
        </Text>
        <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
      </View>

      <Pressable
        style={[styles.button, watched && styles.buttonOn]}
        onPress={onToggleWatch}
      >
        <Text style={styles.buttonText}>{watched ? 'Remove' : 'Watch'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  small: {
    color: '#555',
  },
  price: {
    marginTop: 4,
    fontWeight: '600',
    color: '#1b5e20',
  },
  button: {
    backgroundColor: '#1565c0',
    paddingHorizontal: 14,
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonOn: {
    backgroundColor: '#c62828',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});