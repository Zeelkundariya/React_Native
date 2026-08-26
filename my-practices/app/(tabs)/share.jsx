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

// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   TextInput,
//   Share,
// } from "react-native";

// import { useState } from "react";
// import * as ImagePicker from "expo-image-picker";
// import * as Sharing from "expo-sharing";
// import * as DocumentPicker from "expo-document-picker";

// export default function ShareScreen() {
//   const [image, setImage] = useState(null);
//   const [text, setText] = useState("");
//   const [file, setFile] = useState(null);

//   // Select Image
//   const selectImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ["images"],
//     });

//     if (result.canceled) return;

//     setImage(result.assets[0].uri);
//   };

//   // Share Image
//   const shareImage = async () => {
//     if (!image) return;

//     await Sharing.shareAsync(image);
//   };

//   // Share Text
//   const shareText = async () => {
//     if (!text.trim()) return;

//     await Share.share({
//       message: text,
//     });
//   };

//   // Select File
//   const selectFile = async () => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type: "*/*",
//     });

//     if (result.canceled) return;

//     setFile(result.assets[0]);
//   };

//   // Share File
//   const shareFile = async () => {
//     if (!file) return;

//     await Sharing.shareAsync(file.uri);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Share Features</Text>

//       {/* IMAGE */}

//       {image && (
//         <Image
//           source={{ uri: image }}
//           style={styles.image}
//         />
//       )}

//       <Button
//         title="Select Image"
//         onPress={selectImage}
//       />

//       {image && (
//         <View style={styles.space}>
//           <Button
//             title="Share Image"
//             onPress={shareImage}
//           />
//         </View>
//       )}

//       {/* TEXT */}

//       <TextInput
//         placeholder="Type something"
//         value={text}
//         onChangeText={setText}
//         style={styles.input}
//       />

//       <Button
//         title="Share Text"
//         onPress={shareText}
//       />

//       {/* FILE */}

//       <View style={styles.fileSection}>
//         <Button
//           title="Select File"
//           onPress={selectFile}
//         />

//         {file && (
//           <Text style={styles.fileName}>
//             {file.name}
//           </Text>
//         )}

//         {file && (
//           <View style={styles.space}>
//             <Button
//               title="Share File"
//               onPress={shareFile}
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },

//   title: {
//     fontSize: 20,
//     marginBottom: 20,
//   },

//   image: {
//     width: 250,
//     height: 250,
//     marginBottom: 20,
//   },

//   input: {
//     width: 250,
//     borderWidth: 1,
//     padding: 10,
//     marginTop: 20,
//     marginBottom: 10,
//     backgroundColor: "grey",
//   },

//   fileSection: {
//     marginTop: 20,
//     alignItems: "center",
//   },

//   fileName: {
//     marginTop: 10,
//     marginBottom: 10,
//   },

//   space: {
//     marginTop: 10,
//     marginBottom: 15,
//   },
// });











import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  Share,
} from "react-native";

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";

export default function ShareScreen() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  // Select Image
  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  };

  // Share Image
  const shareImage = async () => {
    if (!image) return;

    await Sharing.shareAsync(image);
  };

  // Share Text
  const shareText = async () => {
    if (!text.trim()) return;

    await Share.share({
      message: text,
    });
  };

  // Select File
  const selectFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*"
      // copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    setFile(result.assets[0]);
  };

  // Share File
  const shareFile = async () => {
    try {
      const available = await Sharing.isAvailableAsync();

      if (!available) {
        return;
      }

      if (!file) {
        return;
      }

      console.log("FILE:", file);
      console.log("FILE URI:", file.uri);

      await Sharing.shareAsync(file.uri
        
      //   {
      //   mimeType: file.mimeType,
      //   dialogTitle: "Share File",
      // }
    
    );

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Share Features
      </Text>

      {/* IMAGE */}

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

      {image && (
        <View style={styles.space}>
          <Button
            title="Share Image"
            onPress={shareImage}
          />
        </View>
      )}

      {/* TEXT */}

      <TextInput
        placeholder="Type something"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />

      <Button
        title="Share Text"
        onPress={shareText}
      />

      {/* FILE */}

      <View style={styles.fileSection}>

        <Button
          title="Select File"
          onPress={selectFile}
        />

        {file && (
          <Text style={styles.fileName}>
            {file.name}
          </Text>
        )}

        {file && (
          <View style={styles.space}>
            <Button
              title="Share File"
              onPress={shareFile}
            />
          </View>
        )}

      </View>

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
    fontSize: 20,
    marginBottom: 20,
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  input: {
    width: 250,
    borderWidth: 1,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "grey",
  },

  fileSection: {
    marginTop: 20,
    alignItems: "center",
  },

  fileName: {
    marginTop: 10,
    marginBottom: 10,
  },

  space: {
    marginTop: 10,
    marginBottom: 15,
  },
});

// import { TextInput, View ,Share,Button} from "react-native";
// import { useState } from "react";


// export default function ShareScreen() {
//   const [text, setText] = useState("");

//   const handleShare = async()=>{
//      const res =await Share.share({
//       message:text
//      })
//      setText(res)
//   }
//   return (
//     <View style={{flex:1,justifyContent:"center"}}>
//       <TextInput placeholder="type something" value={text} onChangeText={setText} />
//       <Button title="Copy" onPress={handleShare}/>
//     </View>
//   )
// }