import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication App</Text>
      <View style={styles.buttonContainer}>
        <Button title="Go to Login" onPress={() => router.push("/login")} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Go to Register" onPress={() => router.push("/register")} />
      </View>
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  buttonContainer: {
    width: "80%",
    marginVertical: 10,
  },
});
