import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import RouteCard from '../components/RouteCard';
import routes from '../data/routes';

const filters = ['All', 'Taxi', 'Bus/BRT', 'Rail'];

// which transport modes belong to which filter
function matchesFilter(mode, filter) {
  if (filter === 'All') return true;
  if (filter === 'Taxi') return mode === 'Minibus Taxi';
  if (filter === 'Bus/BRT') return mode === 'Rea Vaya' || mode === 'Metrobus';
  if (filter === 'Rail') return mode === 'Gautrain';
  return false;
}

export default function HomeScreen({ navigation }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [maxFare, setMaxFare] = useState('');

  // new list each time, original array is never changed
  const visibleRoutes = routes.filter((r) => {
    const modeOk = matchesFilter(r.mode, activeFilter);
    const fareOk = maxFare === '' || r.fare <= Number(maxFare);
    return modeOk && fareOk;
  });

  return (
    <View style={styles.container}>
      <View style={styles.filterRow}>
        {filters.map((f) => (
          <Pressable
            key={f}
            style={[styles.chip, activeFilter === f && styles.chipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text
              style={activeFilter === f ? styles.chipTextActive : styles.chipText}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Maximum fare (R)"
        keyboardType="numeric"
        value={maxFare}
        onChangeText={setMaxFare}
      />

      <FlatList
        data={visibleRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RouteCard
            route={item}
            onPress={() => navigation.navigate('RouteDetails', { selectedRoute: item })}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No routes match.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#1565c0',
  },
  chipText: {
    color: '#333',
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#777',
  },
});