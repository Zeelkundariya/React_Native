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

import * as Clipboard from "expo-clipboard";

export default function ClipboardScreen() {
  const [notes, setNotes] = useState("");

  // Sample data for this module
  const surveyId = "SURVEY-001";
  const contactNumber = "9876543210";
  const currentLocation = "22.3072, 73.1812";

  // Copy Survey ID
  const copySurveyId = async () => {
    await Clipboard.setStringAsync(surveyId);

    Alert.alert(
      "Success",
      "Survey ID copied"
    );
  };

  // Copy Contact Number
  const copyContactNumber = async () => {
    await Clipboard.setStringAsync(contactNumber);

    Alert.alert(
      "Success",
      "Contact number copied"
    );
  };

  // Copy Location
  const copyLocation = async () => {
    await Clipboard.setStringAsync(currentLocation);

    Alert.alert(
      "Success",
      "Location copied"
    );
  };

  // Paste Notes
  const pasteNotes = async () => {
    const text =
      await Clipboard.getStringAsync();

    if (!text) {
      Alert.alert(
        "Clipboard Empty",
        "No data found in clipboard"
      );
      return;
    }

    setNotes(text);
  };

  // Clear Clipboard
  const clearClipboard = async () => {
    await Clipboard.setStringAsync("");

    Alert.alert(
      "Success",
      "Clipboard cleared"
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Clipboard
      </Text>

      {/* Survey ID */}
      <View style={styles.box}>
        <Text style={styles.label}>
          Survey ID
        </Text>

        <Text>{surveyId}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={copySurveyId}
        >
          <Text style={styles.buttonText}>
            Copy Survey ID
          </Text>
        </TouchableOpacity>
      </View>

      {/* Contact Number */}
      <View style={styles.box}>
        <Text style={styles.label}>
          Contact Number
        </Text>

        <Text>{contactNumber}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={copyContactNumber}
        >
          <Text style={styles.buttonText}>
            Copy Contact Number
          </Text>
        </TouchableOpacity>
      </View>

      {/* Current Location */}
      <View style={styles.box}>
        <Text style={styles.label}>
          Current Location
        </Text>

        <Text>{currentLocation}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={copyLocation}
        >
          <Text style={styles.buttonText}>
            Copy Location
          </Text>
        </TouchableOpacity>
      </View>

      {/* Notes */}
      <Text style={styles.label}>
        Notes
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Paste or enter notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity
        style={styles.button}
        onPress={pasteNotes}
      >
        <Text style={styles.buttonText}>
          Paste Notes
        </Text>
      </TouchableOpacity>

      {/* Clear Clipboard */}
      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearClipboard}
      >
        <Text style={styles.buttonText}>
          Clear Clipboard
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  box: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 15,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },

  clearButton: {
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});