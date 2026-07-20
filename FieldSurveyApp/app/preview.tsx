import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useTheme, Colors } from "../context/ThemeContext";
import { AnimatedPressable } from "../components/AnimatedPressable";
import { useRouter } from "expo-router";

export default function PreviewScreen() {
  const { colors, isDark } = useTheme();
  const styles = React.useMemo(() => createStyles(colors, isDark), [colors, isDark]);
  const router = useRouter();

  // Sample Survey Data
  const survey = {
    siteName: "ABC Construction Site",
    clientName: "ABC Company",
    description: "Building inspection survey",
    priority: "High",
    date: "18/07/2026",

    photo:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600",

    contactName: "Rahul",
    contactNumber: "9876543210",

    latitude: "22.3072",
    longitude: "73.1812",

    notes: "Site inspection completed successfully.",
  };

  // Edit Survey
  const editSurvey = () => {
    router.push("/(drawer)/(tabs)/survey");
  };

  // Submit Survey
  const submitSurvey = () => {
    if (Platform.OS === "web") {
      window.alert("Your survey has been submitted successfully.");
      router.push("/(drawer)/(tabs)");
    } else {
      Alert.alert(
        "Survey Submitted",
        "Your survey has been submitted successfully.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(drawer)/(tabs)"),
          },
        ]
      );
    }
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
              Survey Preview
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="document-text-outline"
              size={26}
              color={colors.primary}
            />
          </View>
        </View>

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >

          {/* Introduction */}
          <Text style={styles.title}>
            Review Your Survey
          </Text>

          <Text style={styles.subtitle}>
            Please verify all information before submitting.
          </Text>

          {/* Site Details */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons
                  name="business-outline"
                  size={22}
                  color={colors.primaryLight}
                />
              </View>

              <View>
                <Text style={styles.cardTitle}>
                  Site Details
                </Text>

                <Text style={styles.cardSubtitle}>
                  Survey information
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Site Name
              </Text>

              <Text style={styles.infoValue}>
                {survey.siteName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Client
              </Text>

              <Text style={styles.infoValue}>
                {survey.clientName}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Description
              </Text>

              <Text style={styles.infoValue}>
                {survey.description}
              </Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Priority
              </Text>

              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>
                  {survey.priority}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>
                Date
              </Text>

              <Text style={styles.infoValue}>
                {survey.date}
              </Text>
            </View>
          </View>

          {/* Photo */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.photoIcon}>
                <Ionicons
                  name="camera-outline"
                  size={22}
                  color="#7C3AED"
                />
              </View>

              <View>
                <Text style={styles.cardTitle}>
                  Survey Photo
                </Text>

                <Text style={styles.cardSubtitle}>
                  Captured site image
                </Text>
              </View>
            </View>

            <Image
              source={{ uri: survey.photo }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* Contact */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.contactIcon}>
                <Ionicons
                  name="person-outline"
                  size={22}
                  color="#EA580C"
                />
              </View>

              <View>
                <Text style={styles.cardTitle}>
                  Contact
                </Text>

                <Text style={styles.cardSubtitle}>
                  Contact person details
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <Ionicons
                name="person-outline"
                size={18}
                color={colors.textSecondary}
              />

              <View style={styles.detailContent}>
                <Text style={styles.infoLabel}>
                  Name
                </Text>

                <Text style={styles.detailValue}>
                  {survey.contactName}
                </Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <Ionicons
                name="call-outline"
                size={18}
                color={colors.textSecondary}
              />

              <View style={styles.detailContent}>
                <Text style={styles.infoLabel}>
                  Phone Number
                </Text>

                <Text style={styles.detailValue}>
                  {survey.contactNumber}
                </Text>
              </View>
            </View>
          </View>

          {/* Location */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.locationIcon}>
                <Ionicons
                  name="location-outline"
                  size={22}
                  color="#DC2626"
                />
              </View>

              <View>
                <Text style={styles.cardTitle}>
                  Location
                </Text>

                <Text style={styles.cardSubtitle}>
                  Survey GPS coordinates
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.coordinates}>
              <View style={styles.coordinateBox}>
                <Text style={styles.coordinateLabel}>
                  LATITUDE
                </Text>

                <Text style={styles.coordinateValue}>
                  {survey.latitude}
                </Text>
              </View>

              <View style={styles.coordinateBox}>
                <Text style={styles.coordinateLabel}>
                  LONGITUDE
                </Text>

                <Text style={styles.coordinateValue}>
                  {survey.longitude}
                </Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.notesIcon}>
                <Ionicons
                  name="create-outline"
                  size={22}
                  color="#2563EB"
                />
              </View>

              <View>
                <Text style={styles.cardTitle}>
                  Survey Notes
                </Text>

                <Text style={styles.cardSubtitle}>
                  Additional information
                </Text>
              </View>
            </View>

            <View style={styles.notesBox}>
              <Text style={styles.notesText}>
                {survey.notes}
              </Text>
            </View>
          </View>

          {/* Ready Status */}
          <View style={styles.readyCard}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={colors.primaryLight}
            />

            <View style={styles.readyContent}>
              <Text style={styles.readyTitle}>
                Ready to Submit
              </Text>

              <Text style={styles.readyText}>
                Your survey information is ready for submission.
              </Text>
            </View>
          </View>

          {/* Edit Button */}
          <AnimatedPressable
            style={styles.editButton}
            onPress={editSurvey}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={colors.primary}
            />

            <Text style={styles.editButtonText}>
              Edit Survey
            </Text>
          </AnimatedPressable>

          {/* Submit Button */}
          <AnimatedPressable
            style={styles.submitButton}
            onPress={submitSurvey}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={21}
              color={colors.card}
            />

            <Text style={styles.submitButtonText}>
              Submit Survey
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

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.text,
  },

  cardSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },

  // Icons
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: colors.primaryHighlight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  photoIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: "#F5F3FF",
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

  // Site Info
  infoRow: {
    marginBottom: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },

  infoValue: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
    marginTop: 3,
  },

  // Priority
  priorityBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF2F2",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 4,
  },

  priorityText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "bold",
  },

  // Image
  image: {
    width: "100%",
    height: 210,
    borderRadius: 12,
    marginTop: 15,
  },

  // Contact Details
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },

  detailContent: {
    marginLeft: 12,
  },

  detailValue: {
    fontSize: 14,
    color: "#334155",
    fontWeight: "500",
    marginTop: 2,
  },

  // Coordinates
  coordinates: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  coordinateBox: {
    width: "48%",
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 12,
  },

  coordinateLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: "600",
  },

  coordinateValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "bold",
    marginTop: 5,
  },

  // Notes
  notesBox: {
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 13,
    marginTop: 14,
  },

  notesText: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },

  // Ready Status
  readyCard: {
    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#D1FAE5",

    borderRadius: 14,

    padding: 14,
    marginBottom: 15,

    flexDirection: "row",
    alignItems: "center",
  },

  readyContent: {
    flex: 1,
    marginLeft: 11,
  },

  readyTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary,
  },

  readyText: {
    fontSize: 11,
    color: colors.primaryLight,
    marginTop: 2,
  },

  // Edit Button
  editButton: {
    backgroundColor: colors.primaryHighlight,

    borderWidth: 1,
    borderColor: "#A7F3D0",

    paddingVertical: 14,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  editButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 7,
  },

  // Submit Button
  submitButton: {
    backgroundColor: colors.primaryLight,

    paddingVertical: 15,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 10,
  },

  submitButtonText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 7,
  },
});