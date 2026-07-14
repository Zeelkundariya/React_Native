import React from "react";
import { View, Text, Button, Alert } from "react-native";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
      }}
    >
      <Text>Name: Muhammad Ali</Text>

      <Text>Course: BSCS</Text>

      <Text>College: ABC College</Text>

      <Button
        title="Edit Profile"
        onPress={() => Alert.alert("Profile Updated")}
      />
    </View>
  );
}