import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


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
      <Text style={styles.heading}>Welcome to CodingGita</Text>
      
      <Button title="students screen" onPress={() => alert('')} />

     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eba90d',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0a55a6',
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