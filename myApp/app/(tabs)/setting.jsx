import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const Setting = () => {

  const handlePress = () => {
    console.log("Pressed");
    Alert.alert("Success", "Button Pressed");
  };

  return (
    <View
      style={{  flex: 1,  backgroundColor: "grey", justifyContent: "center",alignItems: "center" }}>
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

export default Setting;