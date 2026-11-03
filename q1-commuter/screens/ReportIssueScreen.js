import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

const categories = ['Delay', 'Safety', 'Cleanliness', 'Other'];

export default function ReportIssueScreen({ route, navigation }) {
  const { selectedRoute } = route.params;

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [report, setReport] = useState(null);

  // check every field, return an object of messages
  function validate() {
    const found = {};
    if (name.trim() === '') {
      found.name = 'Please enter your name';
    }
    // exactly 10 digits and starts with 0
    if (!/^0\d{9}$/.test(phone)) {
      found.phone = 'Cellphone must be 10 digits and start with 0';
    }
    if (category === '') {
      found.category = 'Please choose an issue category';
    }
    if (description.trim().length < 20) {
      found.description = 'Description must be at least 20 characters';
    }
    return found;
  }

  function handleSubmit() {
    const found = validate();
    setErrors(found);

    // do not submit invalid data
    if (Object.keys(found).length > 0) return;

    setReport({
      routeId: selectedRoute.id,
      name: name.trim(),
      phone: phone,
      category: category,
      description: description.trim(),
      submittedAt: new Date().toLocaleString(),
    });

    // clear the form
    setName('');
    setPhone('');
    setCategory('');
    setDescription('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Report: {selectedRoute.mode} ({selectedRoute.id})
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Cellphone (0821234567)"
        keyboardType="phone-pad"
        maxLength={10}
        value={phone}
        onChangeText={setPhone}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <View style={styles.row}>
        {categories.map((c) => (
          <Pressable
            key={c}
            style={[styles.chip, category === c && styles.chipActive]}
            onPress={() => setCategory(c)}
          >
            <Text style={category === c ? styles.chipTextActive : styles.chipText}>
              {c}
            </Text>
          </Pressable>
        ))}
      </View>
      {errors.category && <Text style={styles.error}>{errors.category}</Text>}

      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Describe the problem (min 20 characters)"
        multiline
        value={description}
        onChangeText={setDescription}
      />
      {errors.description && (
        <Text style={styles.error}>{errors.description}</Text>
      )}

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit report</Text>
      </Pressable>

      {report && (
        <View style={styles.confirm}>
          <Text style={styles.confirmTitle}>Report submitted ✔</Text>
          <Text>Route: {report.routeId}</Text>
          <Text>Name: {report.name}</Text>
          <Text>Cellphone: {report.phone}</Text>
          <Text>Category: {report.category}</Text>
          <Text>Description: {report.description}</Text>
          <Text>Time: {report.submittedAt}</Text>

          {/* navigate goes back to the existing Home, no duplicate */}
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Back to Home</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
  },
  multiline: {
    height: 90,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
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
  error: {
    color: '#c62828',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#1565c0',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  confirm: {
    backgroundColor: '#e8f5e9',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  confirmTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
});