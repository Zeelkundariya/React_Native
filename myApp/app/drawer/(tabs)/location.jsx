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

      <View style={styles.card}>

        <Text style={styles.title}>Location Demo</Text>

        <Text style={styles.subtitle}>
          Get your current location
        </Text>

        <Pressable
          style={styles.button}
          onPress={getCurrentLocation}
        >
          <Text style={styles.buttonText}>
            Get Current Location
          </Text>
        </Pressable>

        {location && (
          <View style={styles.locationBox}>

            <Text style={styles.locationTitle}>
              Current Location
            </Text>

            <View style={styles.locationRow}>
              <Text style={styles.label}>Latitude</Text>
              <Text style={styles.value}>
                {location.latitude}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.label}>Longitude</Text>
              <Text style={styles.value}>
                {location.longitude}
              </Text>
            </View>

            <View style={styles.locationRow}>
              <Text style={styles.label}>Accuracy</Text>
              <Text style={styles.value}>
                {location.accuracy?.toFixed(2)} m
              </Text>
            </View>

          </View>
        )}

      </View>

    </View>
  );
};

export default LocationDemo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 22,
    backgroundColor: "#f4f6f8",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  button: {
    height: 52,
    backgroundColor: "#1677ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  locationBox: {
    backgroundColor: "#f4f8ff",
    borderWidth: 1,
    borderColor: "#d9e8ff",
    borderRadius: 12,
    padding: 18,
    marginTop: 20,
  },

  locationTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },

  label: {
    fontSize: 15,
    color: "#777",
    fontWeight: "500",
  },

  value: {
    fontSize: 15,
    color: "#222",
    fontWeight: "600",
  },
});