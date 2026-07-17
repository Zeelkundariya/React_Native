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

    await Clipboard.setStringAsync(textToCopy);
    Alert.alert("Copied", "Text has been copied to clipboard");
  };

  const PastedFromClipboard = async () => {
    const copiedText = await Clipboard.getStringAsync();
    if(copiedText){
    setPastedText(copiedText);
    Alert.alert("Passed", "Text from clipboard has been ")
    } else{
        Alert.alert("Clipboard Empty", "Nothing to paste");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clipboard Demo Class</Text>

      <TextInput
        placeholder="Type something to copy"
        style={styles.input}
        value={textToCopy}
        onChangeText={setTextToCopy}
      />

      <Pressable style={styles.button} onPress={CopyToClipboard}>
        <Text>Text To Copy</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={PastedFromClipboard}>
        <Text>Paste Text From Clipboard</Text>
      </Pressable>

      {pastedText ? (
        <View>
          <Text>{pastedText}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Clipboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },

  button: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
  },
});