import { View, Text , Button, Share, } from "react-native";

export default function ShareScreen() {

    const handleShare = async () => {
        await Share.share({ message: "Hello I am Zeel" })
    }
    return (
        <View style={styles.container}>
            <Text>Share Features</Text>
            <Button title="Share Text" onPress={handleShare} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});