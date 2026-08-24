import { View, Text, Button, Share, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import * as Sharing from "expo-sharing"

export default function ShareScreen() {
    const [text, setText] = useState("")

    const handleShare = async () => {

        if (!text.trim()) {
            return;
        }

        await Share.share({ message: text.trim() })
    }
    return (
        <View style={styles.container}>
            <Text>Share Features</Text>
            <TextInput
                placeholder="Enter text to share" value={text} onChangeText={setText} />
            <Button title="Share Text" onPress={handleShare} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
});