import { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import ReportCard from './components/ReportCard';
import startReports from './data/reports';

export default function App() {
  const [reports, setReports] = useState(startReports);

  // make a new array and a new object, never change the old state
  function toggleResolved(id) {
    setReports((current) =>
      current.map((r) => (r.id === id ? { ...r, resolved: !r.resolved } : r))
    );
  }

  // worked out from state, not stored as a second state
  const openCount = reports.filter((r) => !r.resolved).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MuniFix SA</Text>
      <Text style={styles.counter}>Open reports: {openCount}</Text>

      <FlatList
        data={reports}
        // stable key from the report data
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReportCard report={item} onToggle={toggleResolved} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 16,
    marginVertical: 10,
    fontWeight: '600',
  },
});