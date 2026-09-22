// import { View, Text, Button, StyleSheet, TextInput, Alert } from "react-native";
// import * as LocalAuthentication from "expo-local-authentication";
// import { useState } from "react";
// import * as SecureStore from "expo-secure-store";
// import { useRouter } from "expo-router"

// export default function LocalAuthenticationScreen() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();


//   const handleLogin = async () => {
//     if (username === "admin" && password === "12345") {
//       await SecureStore.setItemAsync("token", "abc123");
//       await SecureStore.setItemAsync("biometric", "true");
//       Alert.alert("Success", "Login Success");
//       // console.log(true)
//     } else {
//       Alert.alert("Failed", "Invalid Username & password")
//     }

//     const types =
//       await LocalAuthentication
//         .supportedAuthenticationTypesAsync();

//     const supportsFace = await LocalAuthentication.supportedAuthenticationTypesAsync()


//     console.log(
//       "Supports face authentication:",
//       supportsFace
//     );
//   };

//   const handleBioLogin = async () => {
//     const token = await SecureStore.getItemAsync("token");
//     const biometric = await SecureStore.getItemAsync("biometric");

//     if (!token || biometric !== "true") {
//       alert("Please login first with username and password");
//       return;
//     }

//     const hasHardware = await LocalAuthentication.hasHardwareAsync();
//     console.log(hasHardware)

//     if (!hasHardware) {
//       return;
//     }

//     const isEnrolled = await LocalAuthentication.isEnrolledAsync();

//     if (!isEnrolled) {
//       return;
//     }

//     const res = await LocalAuthentication.authenticateAsync({
//       promptMessage: "Login with biometric",
//     });

//     if (res.success) {
//       router.replace("/");
//     } else {
//       alert("Authentication Failed");
//     }
//   }

//   const handleSupport = async () => {
//     const res = await LocalAuthentication.supportedAuthenticationTypesAsync();
//     console.log(res)
//   }

//   const handlelevel = async () => {
//     const level =
//       await LocalAuthentication.getEnrolledLevelAsync();

//     console.log("Enrolled security level:", level);

//     Alert.alert(
//       "Security Level",
//       level.toString()
//     );
//   };
//   return (
//     <View style={styles.container}>
//       <Text>Authentication</Text>

//       <TextInput placeholder="enter username"
//         value={username}
//         onChangeText={setUsername}
//         style={styles.input}

//       />
//       <TextInput
//         placeholder="Enter password"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//       />

//       <Button title="Login" onPress={handleLogin} />
//       <View style={{ height: 20 }} />

//       <Button
//         title="Login with Face ID"
//         onPress={handleBioLogin}
//       />
//       <View style={{ height: 20 }} />
//       <Button title="Support" onPress={handleSupport} />
//       <View style={{ height: 20 }} />

//       <Button title="level" onPress={handlelevel} />

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 22,
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   input: {
//     borderWidth: 1,
//     borderColor: "grey",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 15,
//   },

// });



import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";

import * as LocalAuthentication from "expo-local-authentication";
import { useState } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export default function LocalAuthenticationScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  // Normal Login
  const handleLogin = async () => {
    if (username === "admin" && password === "12345") {
      await SecureStore.setItemAsync("token", "abc123");
      await SecureStore.setItemAsync("biometric", "true");

      Alert.alert("Success", "Login Success");
    } else {
      Alert.alert("Failed", "Invalid Username & Password");
    }
  };

  // Face ID Login
  const handleBioLogin = async () => {
    try {
      // Check hardware
      const hasHardware =
        await LocalAuthentication.hasHardwareAsync();

      if (!hasHardware) {
        Alert.alert(
          "Error",
          "This device does not support biometric authentication."
        );
        return;
      }

      // Check Face ID / biometric enrollment
      const isEnrolled =
        await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        Alert.alert(
          "Error",
          "Face ID is not enrolled on this iPhone."
        );
        return;
      }

      // Check supported authentication types
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      console.log("Supported types:", types);

      // Check if Face ID is available
      const faceID =
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION;

      if (!types.includes(faceID)) {
        Alert.alert(
          "Error",
          "Face ID is not available."
        );
        return;
      }

      // Authenticate
      const result =
        await LocalAuthentication.authenticateAsync({
          promptMessage: "Login with Face ID",
          cancelLabel: "Cancel",
          disableDeviceFallback: true,
        });

      console.log("Authentication result:", result);

      if (result.success) {
        Alert.alert("Success", "Face ID Login Successful");

        router.replace("/");
      } else {
        Alert.alert(
          "Failed",
          "Face ID authentication failed."
        );
      }
    } catch (error) {
      console.log("Face ID Error:", error);

      Alert.alert(
        "Error",
        "Something went wrong with Face ID."
      );
    }
  };

  // Supported authentication types
  const handleSupport = async () => {
    const types =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    console.log("Supported authentication types:", types);

    if (
      types.includes(
        LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
      )
    ) {
      Alert.alert("Support", "Face ID is supported");
    } else {
      Alert.alert("Support", "Face ID is NOT supported");
    }
  };

  // Security level
  const handleLevel = async () => {
    const level =
      await LocalAuthentication.getEnrolledLevelAsync();

    console.log("Security level:", level);

    Alert.alert(
      "Security Level",
      level.toString()
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Authentication
      </Text>

      <TextInput
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />

      <TextInput
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title="Login"
        onPress={handleLogin}
      />

      <View style={styles.space} />

      <Button
        title="Login with Face ID"
        onPress={handleBioLogin}
      />

      <View style={styles.space} />

      <Button
        title="Check Face ID Support"
        onPress={handleSupport}
      />

      <View style={styles.space} />

      <Button
        title="Check Security Level"
        onPress={handleLevel}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
  },

  input: {
    width: 250,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },

  space: {
    height: 20,
  },
});