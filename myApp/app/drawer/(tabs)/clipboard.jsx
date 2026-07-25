import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import * as ExpoClipboard from "expo-clipboard";

const Clipboard = () => {
  const [textToCopy, setTextToCopy] = useState("");
  const [pastedText, setPastedText] = useState("");

  const CopyToClipboard = async () => {
    if (!textToCopy.trim()) {
      Alert.alert("Type Something", "Write Something to copy");
      return;
    }

    await ExpoClipboard.setStringAsync(textToCopy);

    Alert.alert("Copied", "Text has been copied to clipboard");
  };

  const PastedFromClipboard = async () => {
    const copiedText = await ExpoClipboard.getStringAsync();

    if(copiedText){
      setPastedText(copiedText);

      Alert.alert("Pasted", "Text has been pasted from clipboard");
    } else{
      Alert.alert("Clipboard Empty", "Nothing to paste");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>Clipboard Demo</Text>

        <Text style={styles.subtitle}>
          Copy and paste text using clipboard
        </Text>

        <Text style={styles.label}>Enter Text</Text>

        <TextInput
          placeholder="Type something to copy"
          placeholderTextColor="#999"
          style={styles.input}
          value={textToCopy}
          onChangeText={setTextToCopy}
        />

        <Pressable style={styles.copyButton} onPress={CopyToClipboard}>
          <Text style={styles.buttonText}>Copy Text</Text>
        </Pressable>

        <Pressable style={styles.pasteButton} onPress={PastedFromClipboard}>
          <Text style={styles.pasteButtonText}>Paste From Clipboard</Text>
        </Pressable>

        {pastedText ? (
          <View style={styles.resultBox}>

            <Text style={styles.resultTitle}>Pasted Text</Text>

            <Text style={styles.resultText}>{pastedText}</Text>

          </View>
        ) : null}

      </View>

    </View>
  );
};

export default Clipboard;

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

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d5d5d5",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
    fontSize: 16,
    color: "#222",
    marginBottom: 20,
  },

  copyButton: {
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

  pasteButton: {
    height: 52,
    borderWidth: 1.5,
    borderColor: "#1677ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },

  pasteButtonText: {
    color: "#1677ff",
    fontSize: 16,
    fontWeight: "bold",
  },

  resultBox: {
    backgroundColor: "#f4f8ff",
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#d9e8ff",
  },

  resultTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
    marginBottom: 8,
  },

  resultText: {
    fontSize: 16,
    color: "#222",
  },
});