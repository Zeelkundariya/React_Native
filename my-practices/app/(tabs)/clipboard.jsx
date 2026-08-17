import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";

export default function Clip() {
  const [text, setText] = useState("");
  const [copiedText, setCopiedText] = useState("");

  const handleCopyText = async () => {
    if (!text.trim()) {
      Alert.alert("Empty Text", "Please enter some text");
      return;
    }

    await Clipboard.setStringAsync(text);

    Alert.alert("Copied", "Text copied to clipboard");
  };

  const handleCopiedData = async () => {
    const data = await Clipboard.getStringAsync();
    setCopiedText(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clipboard Class</Text>

      <TextInput
        style={styles.input}
        placeholder="Write something"
        value={text}
        onChangeText={setText}
      />

      <Button title="Copy Text" onPress={handleCopyText} />

      <View style={styles.space} />

      <Button title="Get Copied Data" onPress={handleCopiedData} />

      {copiedText && (
        <Text style={styles.result}>
          Copied Data: {copiedText}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  input: {
    color:"grey",
    borderWidth: 1,
    padding: 10,
    width: 250,
    marginBottom: 15,
  },

  space: {
    height: 20,
  },

  result: {
    color:"grey",
    marginTop: 20,
    fontSize: 18,
  },
});