import { StyleSheet } from 'react-native';

export const common = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
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
  button: {
    backgroundColor: '#1565c0',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonDanger: {
    backgroundColor: '#c62828',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  link: {
    color: '#1565c0',
    textAlign: 'center',
    marginTop: 14,
  },
  error: {
    color: '#c62828',
    marginTop: 8,
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
  chipTextOn: {
    color: '#fff',
    fontWeight: 'bold',
  },
});