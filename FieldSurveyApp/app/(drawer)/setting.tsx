import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out of your account?", [
      { text: "Cancel", style: "cancel" },
      { text: "Log Out", style: "destructive", onPress: () => Alert.alert("Logged Out", "You have been logged out successfully.") }
    ]);
  };

  const handleClearData = () => {
    Alert.alert("Clear Data", "This will remove all saved offline surveys. Proceed?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: () => Alert.alert("Data Cleared", "All offline data has been removed.") }
    ]);
  };

  const copyAppVersion = async () => {
    await Clipboard.setStringAsync("1.0.0");
    Alert.alert("Copied", "App version copied to clipboard.");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerSmall}>SMART FIELD SURVEY</Text>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.headerIcon}>
            <Ionicons name="settings-outline" size={26} color="#047857" />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Preferences</Text>
          <Text style={styles.subtitle}>Manage your app settings and preferences.</Text>

          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={22} color="#059669" />
                <Text style={styles.settingLabel}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#E2E8F0", true: "#34D399" }}
                thumbColor={notificationsEnabled ? "#059669" : "#F8FAFC"}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="moon-outline" size={22} color="#059669" />
                <Text style={styles.settingLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: "#E2E8F0", true: "#34D399" }}
                thumbColor={darkMode ? "#059669" : "#F8FAFC"}
              />
            </View>
            
            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="location-outline" size={22} color="#059669" />
                <Text style={styles.settingLabel}>Location Tracking</Text>
              </View>
              <Switch
                value={locationTracking}
                onValueChange={setLocationTracking}
                trackColor={{ false: "#E2E8F0", true: "#34D399" }}
                thumbColor={locationTracking ? "#059669" : "#F8FAFC"}
              />
            </View>
          </View>

          <Text style={styles.title}>Data & Storage</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="save-outline" size={22} color="#059669" />
                <Text style={styles.settingLabel}>Auto-Save Surveys</Text>
              </View>
              <Switch
                value={autoSave}
                onValueChange={setAutoSave}
                trackColor={{ false: "#E2E8F0", true: "#34D399" }}
                thumbColor={autoSave ? "#059669" : "#F8FAFC"}
              />
            </View>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingRow} onPress={handleClearData}>
              <View style={styles.settingInfo}>
                <Ionicons name="trash-outline" size={22} color="#EF4444" />
                <Text style={[styles.settingLabel, { color: "#EF4444" }]}>Clear Offline Data</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Account</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.settingRow} onPress={() => router.push("/(drawer)/(tabs)/profile")}>
              <View style={styles.settingInfo}>
                <Ionicons name="person-outline" size={22} color="#059669" />
                <Text style={styles.settingLabel}>Profile Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingRow} onPress={copyAppVersion}>
              <View style={styles.settingInfo}>
                <Ionicons name="information-circle-outline" size={22} color="#059669" />
                <Text style={styles.settingLabel}>App Version (1.0.0)</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.settingRow} onPress={handleLogout}>
              <View style={styles.settingInfo}>
                <Ionicons name="log-out-outline" size={22} color="#EF4444" />
                <Text style={[styles.settingLabel, { color: "#EF4444" }]}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
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
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  headerIcon: {
    backgroundColor: "#ECFDF5",
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E293B",
    marginBottom: 6,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 4,
  },
});
