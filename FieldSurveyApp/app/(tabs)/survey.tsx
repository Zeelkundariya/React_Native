import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Survey() {
  const router = useRouter();

  const [siteName, setSiteName] = useState("");
  const [clientName, setClientName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [date, setDate] = useState("");

  // Validate Form
  const handleSubmit = () => {
    if (
      !siteName.trim() ||
      !clientName.trim() ||
      !description.trim() ||
      !priority ||
      !date.trim()
    ) {
      Alert.alert(
        "Incomplete Form",
        "Please fill all required fields."
      );
      return;
    }

    Alert.alert(
      "Survey Saved",
      "Survey details saved successfully.",
      [
        {
          text: "OK",
          onPress: () => router.push("/preview"),
        },
      ]
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
              New Survey
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="document-text-outline"
              size={26}
              color="#047857"
            />
          </View>
        </View>

        {/* Scroll Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >

          {/* Introduction */}
          <Text style={styles.title}>
            Create Survey
          </Text>

          <Text style={styles.subtitle}>
            Enter the basic information about your field survey.
          </Text>

          {/* Form Card */}
          <View style={styles.formCard}>

            {/* Section Header */}
            <View style={styles.cardHeader}>
              <View style={styles.cardIcon}>
                <Ionicons
                  name="information-circle-outline"
                  size={23}
                  color="#059669"
                />
              </View>

              <View style={styles.cardHeaderContent}>
                <Text style={styles.cardTitle}>
                  Survey Details
                </Text>

                <Text style={styles.cardSubtitle}>
                  All fields marked * are required
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Site Name */}
            <Text style={styles.label}>
              Site Name <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="business-outline"
                size={19}
                color="#94A3B8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter site name"
                placeholderTextColor="#94A3B8"
                value={siteName}
                onChangeText={setSiteName}
              />
            </View>

            {/* Client Name */}
            <Text style={styles.label}>
              Client Name <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="person-outline"
                size={19}
                color="#94A3B8"
              />

              <TextInput
                style={styles.input}
                placeholder="Enter client name"
                placeholderTextColor="#94A3B8"
                value={clientName}
                onChangeText={setClientName}
              />
            </View>

            {/* Description */}
            <Text style={styles.label}>
              Description <Text style={styles.required}>*</Text>
            </Text>

            <View
              style={[
                styles.inputContainer,
                styles.descriptionContainer,
              ]}
            >
              <Ionicons
                name="create-outline"
                size={19}
                color="#94A3B8"
                style={styles.descriptionIcon}
              />

              <TextInput
                style={[
                  styles.input,
                  styles.descriptionInput,
                ]}
                placeholder="Enter survey description"
                placeholderTextColor="#94A3B8"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>

            {/* Priority */}
            <Text style={styles.label}>
              Priority <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.priorityContainer}>

              {/* Low */}
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "Low" &&
                    styles.lowSelected,
                ]}
                onPress={() => setPriority("Low")}
              >
                <Ionicons
                  name={
                    priority === "Low"
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={17}
                  color={
                    priority === "Low"
                      ? "#059669"
                      : "#94A3B8"
                  }
                />

                <Text
                  style={[
                    styles.priorityText,
                    priority === "Low" &&
                      styles.lowSelectedText,
                  ]}
                >
                  Low
                </Text>
              </TouchableOpacity>

              {/* Medium */}
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "Medium" &&
                    styles.mediumSelected,
                ]}
                onPress={() => setPriority("Medium")}
              >
                <Ionicons
                  name={
                    priority === "Medium"
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={17}
                  color={
                    priority === "Medium"
                      ? "#D97706"
                      : "#94A3B8"
                  }
                />

                <Text
                  style={[
                    styles.priorityText,
                    priority === "Medium" &&
                      styles.mediumSelectedText,
                  ]}
                >
                  Medium
                </Text>
              </TouchableOpacity>

              {/* High */}
              <TouchableOpacity
                style={[
                  styles.priorityButton,
                  priority === "High" &&
                    styles.highSelected,
                ]}
                onPress={() => setPriority("High")}
              >
                <Ionicons
                  name={
                    priority === "High"
                      ? "checkmark-circle"
                      : "ellipse-outline"
                  }
                  size={17}
                  color={
                    priority === "High"
                      ? "#DC2626"
                      : "#94A3B8"
                  }
                />

                <Text
                  style={[
                    styles.priorityText,
                    priority === "High" &&
                      styles.highSelectedText,
                  ]}
                >
                  High
                </Text>
              </TouchableOpacity>

            </View>

            {/* Date */}
            <Text style={styles.label}>
              Date <Text style={styles.required}>*</Text>
            </Text>

            <View style={styles.inputContainer}>
              <Ionicons
                name="calendar-outline"
                size={19}
                color="#94A3B8"
              />

              <TextInput
                style={styles.input}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#94A3B8"
                value={date}
                onChangeText={setDate}
                keyboardType="numbers-and-punctuation"
              />
            </View>

          </View>

          {/* Information Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="bulb-outline"
                size={21}
                color="#059669"
              />
            </View>

            <Text style={styles.infoText}>
              After saving the survey details, you can continue
              with Camera, Location, Contacts and Notes.
            </Text>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Ionicons
              name="save-outline"
              size={21}
              color="#FFFFFF"
            />

            <Text style={styles.submitText}>
              Save Survey Details
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Main
  safeArea: {
    flex: 1,
    backgroundColor: "#047857",
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 50,
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
    marginBottom: 18,
  },

  // Form Card
  formCard: {
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 16,
    padding: 17,

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

  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#ECFDF5",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  cardHeaderContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#0F172A",
  },

  cardSubtitle: {
    fontSize: 11,
    color: "#94A3B8",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 17,
  },

  // Labels
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",

    marginTop: 14,
    marginBottom: 7,
  },

  required: {
    color: "#DC2626",
  },

  // Inputs
  inputContainer: {
    minHeight: 50,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 11,
    backgroundColor: "#F8FAFC",

    paddingHorizontal: 13,

    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,

    fontSize: 14,
    color: "#0F172A",

    paddingVertical: 12,
    marginLeft: 9,
  },

  descriptionContainer: {
    height: 110,
    alignItems: "flex-start",
  },

  descriptionIcon: {
    marginTop: 15,
  },

  descriptionInput: {
    height: 105,
    textAlignVertical: "top",
    paddingTop: 13,
  },

  // Priority
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  priorityButton: {
    width: "31%",

    paddingVertical: 11,

    borderWidth: 1,
    borderColor: "#E2E8F0",

    borderRadius: 10,

    backgroundColor: "#F8FAFC",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  priorityText: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 5,
  },

  lowSelected: {
    backgroundColor: "#ECFDF5",
    borderColor: "#6EE7B7",
  },

  lowSelectedText: {
    color: "#047857",
  },

  mediumSelected: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FCD34D",
  },

  mediumSelectedText: {
    color: "#D97706",
  },

  highSelected: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FCA5A5",
  },

  highSelectedText: {
    color: "#DC2626",
  },

  // Info Card
  infoCard: {
    backgroundColor: "#ECFDF5",

    borderWidth: 1,
    borderColor: "#D1FAE5",

    borderRadius: 13,

    padding: 13,
    marginTop: 16,

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
    color: "#047857",

    lineHeight: 18,
  },

  // Submit
  submitButton: {
    backgroundColor: "#059669",

    paddingVertical: 15,

    borderRadius: 12,

    marginTop: 16,
    marginBottom: 10,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    marginLeft: 8,
  },
});