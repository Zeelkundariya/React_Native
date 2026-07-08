import React from 'react';
import { View,Text, Button, Alert, StyleSheet, TouchableOpacity,} from 'react-native';

const Setting = () => {
  const handlePress = () => {
    console.log("Pressed");
    Alert.alert("Success", "Button Pressed");
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.button}
        onPress={() => console.log("Button Pressed")}
        activeOpacity={0.3}
      >
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>

      <Text style={styles.text}>React Native</Text>

      <Button
        title="Click Me"
        onPress={() => Alert.alert("Clicked")}
      />

      <Button
        title="Login"
        onPress={handlePress}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 13,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Setting;