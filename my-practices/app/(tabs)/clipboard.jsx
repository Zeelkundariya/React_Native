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
  const [copiedTexts, setCopiedTexts] = useState([]);

  const handleCopyText = async () => {
    if (!text.trim()) {
      Alert.alert("Empty Text", "Please enter some text");
      return;
    }

    await Clipboard.setStringAsync(text);

    // Add new copied text to the list
    setCopiedTexts((prev) => [...prev, text]);

    setText("");

    Alert.alert("Copied", "Text copied to clipboard");
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

      <Text style={styles.heading}>Copied Data:</Text>

      {copiedTexts.map((item, index) => (
        <Text key={index} style={styles.result}>
          {index + 1}. {item}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    width: 250,
    marginBottom: 15,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },

  result: {
    fontSize: 18,
    marginBottom: 5,
  },
});