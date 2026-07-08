import React from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const Setting = () => {

  const handlePress = () => {
    console.log("Pressed");
    Alert.alert("Success", "Button Pressed");
  };

  return (
    <View style={styles.container}>
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
    }
})

export default Setting;