import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { Button } from "@react-navigation/elements";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const Home = () => {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await SecureStore.getItemAsync("India");

    if (!token) {
      router.replace("/login");
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("India");

    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page Screen</Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 25,
  },
});