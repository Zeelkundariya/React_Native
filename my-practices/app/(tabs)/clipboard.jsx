// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import * as Clipboard from "expo-clipboard";
// import * as FileSystem from "expo-file-system/legacy";

// export default function App() {
//   const [image, setImage] = useState(null);

//   const getImage = async () => {
   
//       const res = await Clipboard.getImageAsync({
//         format: "png",
//       });

//       setImage(res?.data)

//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Clipboard Image
//       </Text>

//       <Button
//         title="Get Clipboard Image"
//         onPress={getImage}
//       />

//       <View style={styles.imageBox}>
//         {
//             image && (
//                 <Image source={{uri:image}} style={{height:100, width:100}} />
//             )
//         }
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
//     backgroundColor:"teal"
//   },

//   title: {
//     fontSize: 24,
//     marginBottom: 30,
//   },

//   imageBox: {
//     width: 320,
//     height: 320,
//     marginTop: 30,
//     borderWidth: 2,
//     borderColor: "white",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   image: {
//     width: 300,
//     height: 300,
//   },
// });


// import React, { useState } from "react";
// import { View, Text, Button, Image, StyleSheet, Alert,} from "react-native";
// import * as Clipboard from "expo-clipboard";
// import * as FileSystem from "expo-file-system/legacy";

// export default function App() {
//   const [image, setImage] = useState(null);

//   const getImage = async () => {
   
//       const res = await Clipboard.getImageAsync({
//         format: "png",
//       });
// console.log(res)
//       setImage(res?.data)

//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Clipboard Image
//       </Text>

//       <Button
//         title="Get Clipboard Image"
//         onPress={getImage}
//       />

//       <View style={styles.imageBox}>
//         {
//             image && (
//                 <Image source={{uri:image}} style={{height:100, width:100}} />
//             )
//         }
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
//     backgroundColor:"lightblue"
//   },

//   title: {
//     fontSize: 24,
//     marginBottom: 30,
//   },

//   imageBox: {
//     width: 320,
//     height: 320,
//     marginTop: 30,
//     borderWidth: 2,
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   image: {
//     width: 300,
//     height: 300,
//   },
// });
import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  TextInput,
  Image,
  StyleSheet,
  Alert,
} from "react-native";

import * as Clipboard from "expo-clipboard";


export default function ClipboardScreen() {

  const [text, setText] = useState("");
  const [pastedText, setPastedText] = useState("");
  const [image, setImage] = useState(null);


  // =========================
  // COPY TEXT
  // =========================

  const copyText = async () => {

    await Clipboard.setStringAsync(text);

    Alert.alert("Success", "Text copied!");

  };


  // =========================
  // PASTE TEXT
  // =========================

  const pasteText = async () => {

    const result =
      await Clipboard.getStringAsync();

    setPastedText(result);

  };


  // =========================
  // GET IMAGE
  // =========================

  const getImage = async () => {

    const result =
      await Clipboard.getImageAsync({
        format: "png",
      });


    if (result) {

      setImage(result.data);

    } else {

      Alert.alert(
        "No Image",
        "No image found in clipboard"
      );

    }

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📋 Clipboard App
      </Text>


      {/* =====================
          TEXT INPUT
      ====================== */}

      <TextInput
        style={styles.input}
        placeholder="Enter text..."
        value={text}
        onChangeText={setText}
      />


      {/* COPY */}

      <Button
        title="Copy Text"
        onPress={copyText}
      />


      {/* PASTE */}

      <Button
        title="Paste Text"
        onPress={pasteText}
      />


      {/* PASTED TEXT */}

      <Text style={styles.result}>
        Pasted Text: {pastedText}
      </Text>


      {/* =====================
          IMAGE
      ====================== */}

      <Button
        title="Get Clipboard Image"
        onPress={getImage}
      />


      <View style={styles.imageBox}>

        {image && (

          <Image
            source={{
              uri: image,
            }}
            style={styles.image}
          />

        )}

      </View>

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 12,
    borderRadius: 8,
  },

  result: {
    fontSize: 18,
  },

  imageBox: {
    width: 320,
    height: 320,
    borderWidth: 2,
    borderColor: "gray",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  image: {
    width: 300,
    height: 300,
  },

});