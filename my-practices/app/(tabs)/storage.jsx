import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function AsyncStorageScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Save
  const saveData = async () => {
    const user = {
      name: name,
      email: email,
    };

    await AsyncStorage.setItem("user", JSON.stringify(user));

    console.log("Data Saved");
  };

  // Get
  const getData = async () => {
    const data = await AsyncStorage.getItem("user");

    if (data) {
      const user = JSON.parse(data);

      setName(user.name);
      setEmail(user.email);
    }
  };

  // Delete
  const deleteData = async () => {
    await AsyncStorage.removeItem("user");

    setName("");
    setEmail("");

    console.log("Data Deleted");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text>Name</Text>

      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Text>Email</Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button title="Save Data" onPress={saveData} />

      <View style={{ height: 10 }} />

      <Button title="Get Data" onPress={getData} />

      <View style={{ height: 10 }} />

      <Button title="Delete Data" onPress={deleteData} />

      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
}








import { View, Text, TextInput, Button } from "react-native";

import * as SecureStore from "expo-secure-store";

import { useState } from "react";

export default function SecureStorageScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Save
  const saveData = async () => {
    const user = {
      name: name,
      email: email,
    };

    await SecureStore.setItemAsync(
      "user",
      JSON.stringify(user)
    );

    console.log("Data Saved");
  };

  // Get
  const getData = async () => {
    const data = await SecureStore.getItemAsync("user");

    if (data) {
      const user = JSON.parse(data);

      setName(user.name);
      setEmail(user.email);
    }
  };

  // Delete
  const deleteData = async () => {
    await SecureStore.deleteItemAsync("user");

    setName("");
    setEmail("");

    console.log("Data Deleted");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text>Name</Text>

      <TextInput
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
        }}
      />

      <Text>Email</Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 20,
        }}
      />

      <Button
        title="Save Data"
        onPress={saveData}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Get Data"
        onPress={getData}
      />

      <View style={{ height: 10 }} />

      <Button
        title="Delete Data"
        onPress={deleteData}
      />

      <Text>Name: {name}</Text>
      <Text>Email: {email}</Text>
    </View>
  );
}