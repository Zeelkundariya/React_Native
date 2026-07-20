import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../../context/ThemeContext";
import { AnimatedPressable } from "../../components/AnimatedPressable";
import { useRouter } from "expo-router";
import * as Clipboard from "expo-clipboard";

export default function SettingsScreen() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationTracking, setLocationTracking] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const { toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out of your account?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Log Out",
        style: "destructive",
        onPress: () => Alert.alert("Logged Out", "You have been logged out successfully."),
      },
    ]);
  };

  const handleClearData = () => {
    Alert.alert("Clear Data", "This will remove all saved offline surveys and clipboard data. Proceed?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          await Clipboard.setStringAsync("");
          Alert.alert("Data Cleared", "All offline data and clipboard has been removed.");
        },
      },
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
            <Ionicons name="settings-outline" size={26} color={colors.primary} />
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Preferences</Text>
          <Text style={styles.subtitle}>Manage your app settings and preferences.</Text>

          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications-outline" size={22} color={colors.primaryLight} />
                <Text style={styles.settingLabel}>Push Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={(val) => {
                  setNotificationsEnabled(val);
                  Alert.alert("Push Notifications", val ? "Enabled" : "Disabled");
                }}
                trackColor={{ false: colors.border, true: "#34D399" }}
                thumbColor={notificationsEnabled ? colors.primaryLight : colors.background}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="moon-outline" size={22} color={colors.primaryLight} />
                <Text style={styles.settingLabel}>Dark Mode</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={(val) => {
                  toggleTheme();
                  Alert.alert("Dark Mode", val ? "Enabled" : "Disabled");
                }}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={isDark ? colors.primary : colors.background}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="location-outline" size={22} color={colors.primaryLight} />
                <Text style={styles.settingLabel}>Location Tracking</Text>
              </View>
              <Switch
                value={locationTracking}
                onValueChange={(val) => {
                  setLocationTracking(val);
                  Alert.alert("Location Tracking", val ? "Enabled" : "Disabled");
                }}
                trackColor={{ false: colors.border, true: "#34D399" }}
                thumbColor={locationTracking ? colors.primaryLight : colors.background}
              />
            </View>
          </View>

          <Text style={styles.title}>Data & Storage</Text>
          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="save-outline" size={22} color={colors.primaryLight} />
                <Text style={styles.settingLabel}>Auto-Save Surveys</Text>
              </View>
              <Switch
                value={autoSave}
                onValueChange={(val) => {
                  setAutoSave(val);
                  Alert.alert("Auto-Save", val ? "Enabled" : "Disabled");
                }}
                trackColor={{ false: colors.border, true: "#34D399" }}
                thumbColor={autoSave ? colors.primaryLight : colors.background}
              />
            </View>

            <View style={styles.divider} />

            <AnimatedPressable style={styles.settingRow} onPress={handleClearData}>
              <View style={styles.settingInfo}>
                <Ionicons name="trash-outline" size={22} color={colors.danger} />
                <Text style={[styles.settingLabel, { color: colors.danger }]}>Clear Offline Data</Text>
              </View>
            </AnimatedPressable>
          </View>

          <Text style={styles.title}>Account</Text>
          <View style={styles.card}>
            <AnimatedPressable style={styles.settingRow} onPress={() => router.push("/(drawer)/(tabs)/profile")}>
              <View style={styles.settingInfo}>
                <Ionicons name="person-outline" size={22} color={colors.primaryLight} />
                <Text style={styles.settingLabel}>Profile Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </AnimatedPressable>

            <View style={styles.divider} />

            <AnimatedPressable style={styles.settingRow} onPress={copyAppVersion}>
              <View style={styles.settingInfo}>
                <Ionicons name="information-circle-outline" size={22} color={colors.primaryLight} />
                <Text style={styles.settingLabel}>App Version (1.0.0)</Text>
              </View>
            </AnimatedPressable>

            <View style={styles.divider} />

            <AnimatedPressable style={styles.settingRow} onPress={handleLogout}>
              <View style={styles.settingInfo}>
                <Ionicons name="log-out-outline" size={22} color={colors.danger} />
                <Text style={[styles.settingLabel, { color: colors.danger }]}>Log Out</Text>
              </View>
            </AnimatedPressable>
          </View>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors, isDark: boolean) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.primary,
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
      color: colors.card,
      fontSize: 28,
      fontWeight: "bold",
    },
    headerIcon: {
      backgroundColor: colors.primaryHighlight,
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 22,
      paddingBottom: 40,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 6,
      marginTop: 10,
    },
    subtitle: {
      fontSize: 15,
      color: colors.textSecondary,
      marginBottom: 20,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 16,
      marginBottom: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.2 : 0.05,
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
      color: colors.text,
      marginLeft: 12,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 4,
    },
  });
