import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Custom Component
const Button = ({ title, onPress }) => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </View>
  );
};

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome</Text>
      
      {/* Reusing the same Button component */}
      <Button title="Login" onPress={() => alert('Login Pressed')} />
      <Button title="Sign Up" onPress={() => alert('Sign Up Pressed')} />
      <Button title="Forgot Password?" onPress={() => alert('Forgot Password')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;