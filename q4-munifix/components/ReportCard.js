import { useRef, useEffect } from 'react';
import { Animated, Text, Pressable, StyleSheet } from 'react-native';

export default function ReportCard({ report, onToggle }) {
  // useRef keeps the same Animated.Value between renders
  const progress = useRef(new Animated.Value(0)).current;

  // play the animation once when the card appears
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [progress]);

  // slide up from 20 to 0 while fading in
  const moveUp = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <Animated.View
      style={[
        styles.card,
        report.resolved ? styles.resolvedCard : styles.openCard,
        {
          opacity: progress,
          transform: [{ translateY: moveUp }],
        },
      ]}
    >
      <Text style={styles.category}>{report.category}</Text>
      <Text style={styles.location}>{report.locationText}</Text>
      <Text style={styles.description}>{report.description}</Text>

      {/* arrow function so it only runs when pressed */}
      <Pressable
        style={[
          styles.button,
          report.resolved ? styles.resolvedButton : styles.openButton,
        ]}
        onPress={() => onToggle(report.id)}
      >
        <Text style={styles.buttonText}>
          {report.resolved ? 'Resolved (tap to reopen)' : 'Open (tap to resolve)'}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 6,
  },
  openCard: {
    backgroundColor: '#fff3e0',
    borderLeftColor: '#ef6c00',
  },
  resolvedCard: {
    backgroundColor: '#e8f5e9',
    borderLeftColor: '#2e7d32',
  },
  category: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: '#555',
    marginVertical: 2,
  },
  description: {
    marginBottom: 8,
  },
  button: {
    padding: 10,
    borderRadius: 8,
  },
  openButton: {
    backgroundColor: '#ef6c00',
  },
  resolvedButton: {
    backgroundColor: '#2e7d32',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});