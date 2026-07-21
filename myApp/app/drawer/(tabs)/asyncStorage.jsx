// import { Button, StyleSheet, Text, TextInput, View } from "react-native";
// import React, { useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const AsyncStorageExample = () => {
// const handleSaveData = async () => {
//   try {
//     await AsyncStorage.setItem("username", name);
//     setSavedData(name);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const handleGetData = async () => {
//   try {
//     const value = await AsyncStorage.getItem("username");

//     if (value !== null) {
//       setSavedData(value);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

// const handleClearData = async () => {
//   try {
//     await AsyncStorage.removeItem("username");
//     setSavedData("");
//   } catch (err) {
//     console.log(err);
//   }
// };
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>AsyncStorage Demo Class</Text>

//       <TextInput
//         placeholder="Enter Something..."
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />

//       <Button title="Save Data" onPress={handleSaveData} />

//       {savedData !== "" && (
//         <Text style={styles.savedText}>Saved Data: {savedData}</Text>
//       )}
//     </View>
//   );
// };

// export default AsyncStorageExample;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },

//   input: {
//     width: "100%",
//     borderWidth: 1,
//     padding: 15,
//     marginBottom: 20,
//   },

//   savedText: {
//     fontSize: 18,
//     marginTop: 20,
//   },
// });