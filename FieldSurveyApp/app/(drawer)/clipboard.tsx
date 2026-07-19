import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../context/ThemeContext";
import { AnimatedPressable } from "../../components/AnimatedPressable";
import * as Clipboard from "expo-clipboard";

export default function ClipboardScreen() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const [notes, setNotes] = useState("");

  // Sample Data
  const surveyId = "SURVEY-001";
  const contactNumber = "9876543210";
  const currentLocation = "22.3072, 73.1812";

  // Copy Survey ID
  const copySurveyId = async () => {
    await Clipboard.setStringAsync(surveyId);

    Alert.alert(
      "Copied",
      "Survey ID copied to clipboard."
    );
  };

  // Copy Contact Number
  const copyContactNumber = async () => {
    await Clipboard.setStringAsync(
      contactNumber
    );

    Alert.alert(
      "Copied",
      "Contact number copied to clipboard."
    );
  };

  // Copy Location
  const copyLocation = async () => {
    await Clipboard.setStringAsync(
      currentLocation
    );

    Alert.alert(
      "Copied",
      "Location copied to clipboard."
    );
  };

  // Paste Notes
  const pasteNotes = async () => {
    const text =
      await Clipboard.getStringAsync();

    if (!text) {
      Alert.alert(
        "Clipboard Empty",
        "No data found in clipboard."
      );

      return;
    }

    setNotes(text);
  };

  // Clear Clipboard
  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");

    Alert.alert(
      "Clipboard Cleared",
      "Clipboard data has been cleared."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSmall}>
              SMART FIELD SURVEY
            </Text>

            <Text style={styles.headerTitle}>
              Clipboard
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="clipboard-outline"
              size={26}
              color={colors.primary}
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.content
          }
          keyboardShouldPersistTaps="handled"
        >

          {/* Introduction */}
          <Text style={styles.title}>
            Survey Clipboard
          </Text>

          <Text style={styles.subtitle}>
            Copy and manage important survey
            information easily.
          </Text>

          {/* Survey ID Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.surveyIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={22}
                  color={colors.primaryLight}
                />
              </View>

              <View style={styles.cardTitleContent}>
                <Text style={styles.cardTitle}>
                  Survey ID
                </Text>

                <Text style={styles.cardSubtitle}>
                  Survey identification number
                </Text>
              </View>
            </View>

            <View style={styles.dataBox}>
              <Text style={styles.dataText}>
                {surveyId}
              </Text>

              <AnimatedPressable
                style={styles.copyIconButton}
                onPress={copySurveyId}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={colors.primaryLight}
                />
              </AnimatedPressable>
            </View>

            <AnimatedPressable
              style={styles.copyButton}
              onPress={copySurveyId}
            >
              <Ionicons
                name="copy-outline"
                size={18}
                color={colors.primary}
              />

              <Text style={styles.copyButtonText}>
                Copy Survey ID
              </Text>
            </AnimatedPressable>
          </View>

          {/* Contact Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.contactIcon}>
                <Ionicons
                  name="call-outline"
                  size={22}
                  color="#EA580C"
                />
              </View>

              <View style={styles.cardTitleContent}>
                <Text style={styles.cardTitle}>
                  Contact Number
                </Text>

                <Text style={styles.cardSubtitle}>
                  Survey contact information
                </Text>
              </View>
            </View>

            <View style={styles.dataBox}>
              <Text style={styles.dataText}>
                {contactNumber}
              </Text>

              <AnimatedPressable
                style={styles.copyIconButton}
                onPress={copyContactNumber}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={colors.primaryLight}
                />
              </AnimatedPressable>
            </View>

            <AnimatedPressable
              style={styles.copyButton}
              onPress={copyContactNumber}
            >
              <Ionicons
                name="copy-outline"
                size={18}
                color={colors.primary}
              />

              <Text style={styles.copyButtonText}>
                Copy Contact Number
              </Text>
            </AnimatedPressable>
          </View>

          {/* Location Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.locationIcon}>
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#DC2626"
                />
              </View>

              <View style={styles.cardTitleContent}>
                <Text style={styles.cardTitle}>
                  Current Location
                </Text>

                <Text style={styles.cardSubtitle}>
                  Survey GPS coordinates
                </Text>
              </View>
            </View>

            <View style={styles.dataBox}>
              <Text style={styles.dataText}>
                {currentLocation}
              </Text>

              <AnimatedPressable
                style={styles.copyIconButton}
                onPress={copyLocation}
              >
                <Ionicons
                  name="copy-outline"
                  size={20}
                  color={colors.primaryLight}
                />
              </AnimatedPressable>
            </View>

            <AnimatedPressable
              style={styles.copyButton}
              onPress={copyLocation}
            >
              <Ionicons
                name="copy-outline"
                size={18}
                color={colors.primary}
              />

              <Text style={styles.copyButtonText}>
                Copy Location
              </Text>
            </AnimatedPressable>
          </View>

          {/* Notes Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.notesIcon}>
                <Ionicons
                  name="create-outline"
                  size={22}
                  color="#2563EB"
                />
              </View>

              <View style={styles.cardTitleContent}>
                <Text style={styles.cardTitle}>
                  Notes
                </Text>

                <Text style={styles.cardSubtitle}>
                  Paste or enter survey notes
                </Text>
              </View>
            </View>

            <TextInput
              style={styles.notesInput}
              placeholder="Paste or enter notes..."
              placeholderTextColor={colors.textMuted}
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            <AnimatedPressable
              style={styles.pasteButton}
              onPress={pasteNotes}
            >
              <Ionicons
                name="clipboard-outline"
                size={19}
                color={colors.card}
              />

              <Text style={styles.pasteButtonText}>
                Paste from Clipboard
              </Text>
            </AnimatedPressable>
          </View>

          {/* Clipboard Info */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="information-circle-outline"
                size={21}
                color={colors.primaryLight}
              />
            </View>

            <Text style={styles.infoText}>
              You can copy survey details and paste
              clipboard content directly into your notes.
            </Text>
          </View>

          {/* Clear Clipboard */}
          <AnimatedPressable
            style={styles.clearButton}
            onPress={clearClipboard}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color="#DC2626"
            />

            <Text style={styles.clearButtonText}>
              Clear Clipboard
            </Text>
          </AnimatedPressable>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (colors: Colors, isDark: boolean) => StyleSheet.create({
  // Main
  safeArea: {
    flex: 1,
    backgroundColor: colors.primary,
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 50,
  },

  // Header
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
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
  },

  headerTitle: {
    color: colors.card,
    fontSize: 27,
    fontWeight: "bold",
    marginTop: 3,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,

    backgroundColor: colors.card,

    justifyContent: "center",
    alignItems: "center",
  },

  // Introduction
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.text,
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
    marginBottom: 18,
  },

  // Cards
  card: {
    backgroundColor: colors.card,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 16,

    padding: 16,
    marginBottom: 15,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardTitleContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },

  cardSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },

  // Icons
  surveyIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  contactIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,

    backgroundColor: "#FFF7ED",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  locationIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,

    backgroundColor: "#FEF2F2",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  notesIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,

    backgroundColor: "#EFF6FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  // Data Box
  dataBox: {
    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 10,

    paddingHorizontal: 13,
    paddingVertical: 12,

    marginTop: 14,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dataText: {
    flex: 1,

    fontSize: 14,
    fontWeight: "600",

    color: "#334155",
  },

  copyIconButton: {
    width: 34,
    height: 34,

    borderRadius: 8,

    backgroundColor: colors.primaryHighlight,

    justifyContent: "center",
    alignItems: "center",

    marginLeft: 10,
  },

  // Copy Button
  copyButton: {
    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#D1FAE5",

    paddingVertical: 11,

    borderRadius: 10,

    marginTop: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  copyButtonText: {
    color: colors.primary,

    fontSize: 13,
    fontWeight: "bold",

    marginLeft: 6,
  },

  // Notes
  notesInput: {
    height: 110,

    backgroundColor: colors.background,

    borderWidth: 1,
    borderColor: colors.border,

    borderRadius: 11,

    padding: 13,

    marginTop: 14,

    fontSize: 14,
    color: colors.text,

    textAlignVertical: "top",
  },

  pasteButton: {
    backgroundColor: colors.primaryLight,

    paddingVertical: 12,

    borderRadius: 10,

    marginTop: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  pasteButtonText: {
    color: colors.card,

    fontSize: 13,
    fontWeight: "bold",

    marginLeft: 7,
  },

  // Information
  infoCard: {
    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#D1FAE5",

    borderRadius: 13,

    padding: 13,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 38,
    height: 38,

    borderRadius: 10,

    backgroundColor: "#D1FAE5",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 10,
  },

  infoText: {
    flex: 1,

    fontSize: 12,
    color: colors.primary,

    lineHeight: 18,
  },

  // Clear Button
  clearButton: {
    backgroundColor: "#FEF2F2",

    borderWidth: 1,
    borderColor: "#FECACA",

    paddingVertical: 14,

    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  clearButtonText: {
    color: "#DC2626",

    fontSize: 14,
    fontWeight: "bold",

    marginLeft: 7,
  },
});