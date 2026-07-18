import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Linking,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";

export default function LocationScreen() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState("");
  const [loading, setLoading] = useState(false);

  // Get Current Location
  const getLocation = async () => {
    try {
      setLoading(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required"
        );
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      setLatitude(currentLocation.coords.latitude);
      setLongitude(currentLocation.coords.longitude);
      setAccuracy(currentLocation.coords.accuracy);

      // Save location fetched time
      setTimestamp(new Date().toLocaleString());
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Could not get your current location"
      );
    } finally {
      setLoading(false);
    }
  };

  // Get Location When Screen Opens
  useEffect(() => {
    getLocation();
  }, []);

  // Copy Location
  const copyLocation = async () => {
    if (latitude === null || longitude === null) {
      Alert.alert(
        "Location Not Available",
        "Please get your location first"
      );
      return;
    }

    const locationText =
      `Latitude: ${latitude}, Longitude: ${longitude}`;

    await Clipboard.setStringAsync(locationText);

    Alert.alert(
      "Copied",
      "Location copied to clipboard"
    );
  };

  // Open Location in Google Maps
  const openMap = async () => {
    if (latitude === null || longitude === null) {
      Alert.alert(
        "Location Not Available",
        "Please get your location first"
      );
      return;
    }

    const url =
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    await Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>
              SMART FIELD SURVEY
            </Text>

            <Text style={styles.headerTitle}>
              Location
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="location"
              size={26}
              color="#047857"
            />
          </View>
        </View>

        {/* Page Introduction */}
        <View style={styles.intro}>
          <Text style={styles.title}>
            Current Location
          </Text>

          <Text style={styles.subtitle}>
            View and manage your current GPS location.
          </Text>
        </View>

        {/* Loading */}
        {loading ? (
          <View style={styles.loadingCard}>
            <ActivityIndicator
              size="large"
              color="#059669"
            />

            <Text style={styles.loadingText}>
              Getting your location...
            </Text>
          </View>
        ) : (
          <>
            {/* Location Card */}
            <View style={styles.locationCard}>
              <View style={styles.cardHeader}>
                <View style={styles.locationIcon}>
                  <Ionicons
                    name="navigate"
                    size={24}
                    color="#059669"
                  />
                </View>

                <View>
                  <Text style={styles.cardTitle}>
                    GPS Information
                  </Text>

                  <Text style={styles.cardSubtitle}>
                    Your current coordinates
                  </Text>
                </View>
              </View>

              <View style={styles.divider} />

              {/* Latitude */}
              <View style={styles.infoRow}>
                <View style={styles.smallIcon}>
                  <Ionicons
                    name="location-outline"
                    size={19}
                    color="#059669"
                  />
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>
                    Latitude
                  </Text>

                  <Text style={styles.infoValue}>
                    {latitude !== null
                      ? latitude.toFixed(6)
                      : "Not Available"}
                  </Text>
                </View>
              </View>

              {/* Longitude */}
              <View style={styles.infoRow}>
                <View style={styles.smallIcon}>
                  <Ionicons
                    name="compass-outline"
                    size={19}
                    color="#059669"
                  />
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>
                    Longitude
                  </Text>

                  <Text style={styles.infoValue}>
                    {longitude !== null
                      ? longitude.toFixed(6)
                      : "Not Available"}
                  </Text>
                </View>
              </View>

              {/* Accuracy */}
              <View style={styles.infoRow}>
                <View style={styles.smallIcon}>
                  <Ionicons
                    name="radio-outline"
                    size={19}
                    color="#059669"
                  />
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>
                    Accuracy
                  </Text>

                  <Text style={styles.infoValue}>
                    {accuracy !== null
                      ? `${accuracy.toFixed(2)} meters`
                      : "Not Available"}
                  </Text>
                </View>
              </View>

              {/* Timestamp - New Feature */}
              <View style={styles.infoRow}>
                <View style={styles.smallIcon}>
                  <Ionicons
                    name="time-outline"
                    size={19}
                    color="#059669"
                  />
                </View>

                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>
                    Last Updated
                  </Text>

                  <Text style={styles.infoValue}>
                    {timestamp || "Not Available"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Action Section */}
            <Text style={styles.sectionTitle}>
              Location Actions
            </Text>

            {/* Refresh */}
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={getLocation}
            >
              <Ionicons
                name="refresh"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.primaryButtonText}>
                Refresh Location
              </Text>
            </TouchableOpacity>

            {/* Copy */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={copyLocation}
            >
              <Ionicons
                name="copy-outline"
                size={20}
                color="#059669"
              />

              <Text style={styles.secondaryButtonText}>
                Copy Location
              </Text>
            </TouchableOpacity>

            {/* Open Map - New Feature */}
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={openMap}
            >
              <Ionicons
                name="map-outline"
                size={20}
                color="#059669"
              />

              <Text style={styles.secondaryButtonText}>
                Open in Google Maps
              </Text>
            </TouchableOpacity>

            {/* Location Status */}
            <View style={styles.statusCard}>
              <View style={styles.statusIcon}>
                <Ionicons
                  name="checkmark-circle"
                  size={24}
                  color="#059669"
                />
              </View>

              <View style={styles.statusContent}>
                <Text style={styles.statusTitle}>
                  Location Ready
                </Text>

                <Text style={styles.statusText}>
                  Your GPS location can be added to the field survey.
                </Text>
              </View>
            </View>
          </>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#047857",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  // Header
  header: {
    backgroundColor: "#047857",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  headerSmall: {
    color: "#A7F3D0",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  // Introduction
  intro: {
    marginHorizontal: 20,
    marginTop: 24,
  },

  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
  },

  // Loading
  loadingCard: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 40,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  loadingText: {
    color: "#64748B",
    marginTop: 12,
  },

  // Location Card
  locationCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  locationIcon: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
  },

  cardSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 16,
  },

  // Location Information
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  smallIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#ECFDF5",
    justifyContent: "center",
    alignItems: "center",
  },

  infoContent: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginTop: 2,
  },

  // Section
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0F172A",
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 12,
  },

  // Primary Button
  primaryButton: {
    backgroundColor: "#059669",
    marginHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },

  // Secondary Buttons
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  secondaryButtonText: {
    color: "#047857",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },

  // Status
  statusCard: {
    backgroundColor: "#ECFDF5",
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1FAE5",
    flexDirection: "row",
    alignItems: "center",
  },

  statusIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#D1FAE5",
    justifyContent: "center",
    alignItems: "center",
  },

  statusContent: {
    flex: 1,
    marginLeft: 12,
  },

  statusTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#047857",
  },

  statusText: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
    lineHeight: 17,
  },
});