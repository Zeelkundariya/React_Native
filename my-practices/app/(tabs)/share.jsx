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


import { View, Text, Button, Share, StyleSheet, TextInput } from "react-native";
import { useState } from "react";
import * as Sharing from "expo-sharing"
import * as ImagePicker from "expo-image-picker"

export default function ShareScreen() {
    const [image, setImage] = useState(null)
    const handleShare = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:["images"],
            allowedEditing: false,
            quality:1,
        });
        console.log(res)

        if(res.canceled){
            return;
        }
      const imageuri= await Sharing.shareAsync(res.assets[0].uri);
      console.log(imageuri)
    }
    return (
        <View style={styles.container}>
            <Text>Share Features</Text>

            {image && (
                <Image source={{uri : image}} />
            )}
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