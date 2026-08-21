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


import React, { useState } from "react";
import { View, Text, Button, Image, StyleSheet, Alert,} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as FileSystem from "expo-file-system/legacy";

export default function App() {
  const [image, setImage] = useState(null);

  const getImage = async () => {
   
      const res = await Clipboard.getImageAsync({
        format: "png",
      });
console.log(res)
      setImage(res?.data)

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Clipboard Image
      </Text>

      <Button
        title="Get Clipboard Image"
        onPress={getImage}
      />

      <View style={styles.imageBox}>
        {
            image && (
                <Image source={{uri:image}} style={{height:100, width:100}} />
            )
        }
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
    backgroundColor:"lightblue"
  },

  title: {
    fontSize: 24,
    marginBottom: 30,
  },

  imageBox: {
    width: 320,
    height: 320,
    marginTop: 30,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: 300,
    height: 300,
  },
});