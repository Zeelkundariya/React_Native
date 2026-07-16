import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
} from "react-native";

import React, { useState } from "react";
import * as Location from "expo-location";

const LocationDemo = () => {
  const [location, setLocation] = useState(null);

  const getCurrentLocation = async () => {
    const { status } =
      await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Access Denied", "Location permission is required");
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High
    });

    console.log(currentLocation)

    setLocation(currentLocation.coords)

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Demo Class</Text>

      <Pressable
        style={styles.button}
        onPress={getCurrentLocation}
      >
        <Text style={styles.buttonText}>
          Get Current Location
        </Text>
      </Pressable>

      {location && (
        <View>
          <Text>Latitude: {location.coords.latitude}</Text>
          <Text>Longitude: {location.coords.longitude}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "lightyellow",
    padding: 15,
    margin: 10,
  },

  buttonText: {
    fontSize: 18,
  },
});