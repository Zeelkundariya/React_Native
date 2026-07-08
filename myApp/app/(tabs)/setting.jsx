import React from 'react';
import { View, Text, Button, Alert, StyleSheet, Pressable } from 'react-native';

const Setting = () => {

  const handlePress = () => {
    console.log("Pressed");
    Alert.alert("Success", "Button Pressed");
  };

  return (
    <View style={styles.container}>

        <Pressable style={styles.button} 
        onPress={()=> Alert.alert("Button Pressed")}>
            <Text style={styles.buttonText}>Button</Text>
        </Pressable>

      <Text>React Native</Text>

      <Button
        title="Click Me"
        onPress={() => Alert.alert("Clicked")}/>
      <Button
        title="Login"
        onPress={handlePress}
      />
    </View>
  );
};


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"grey",
        justifyContent:"center",
        alignItems:"center"
    },
     button: {
    backgroundColor: '#3b82f6',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  }
})

export default Setting;