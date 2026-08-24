// import { View, Text, Button, Share, StyleSheet, TextInput } from "react-native";
// import { useState } from "react";
// import * as Sharing from "expo-sharing"
// import * as ImagePicker from "expo-image-picker"

// export default function ShareScreen() {
//     const [text, setText] = useState("")

//     const handleShare = async () => {

//         if (!text.trim()) {
//             return;
//         }

//         // await Share.share({ message: text.trim() })
//         await Share.share({message:"Check the website", url:"https://reactnative.dev"})
//     }
//     return (
//         <View style={styles.container}>
//             <Text>Share Features</Text>
//             <TextInput
//                 placeholder="Enter text to share" value={text} onChangeText={setText} />
//             <Button title="Share Text" onPress={handleShare} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "grey",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 20,
//     },
// });




//image-picker


import { View, Text, Button, Image, StyleSheet } from "react-native";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";

export default function ShareScreen() {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  const shareImage = async () => {
    if (!image) return;

    await Sharing.shareAsync(image);
  };

  return (
    <View style={styles.container}>
      <Text>Share Image</Text>

      {image && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <Button
        title="Select Image"
        onPress={selectImage}
      />

      <View style={styles.space}>
        <Button
          title="Share Image"
          onPress={shareImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 250,
    height: 250,
    margin: 20,
  },

  space: {
    marginTop: 15,
  },
});