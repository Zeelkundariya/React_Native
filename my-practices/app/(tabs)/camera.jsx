// import { View, StyleSheet, Button, Text, Image } from "react-native";
// import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// import { useState, useRef } from "react";
// import Slider from "@react-native-community/slider";
// import { VideoView, useVideoPlayer } from "expo-video";


// export default function CameraScreen() {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();

//     const [flip, setFlip] = useState("back");
//     const [flash, setFlash] = useState("off");
//     const [zoom, setZoom] = useState(0);
//     const cameraRef = useRef(null);
//     const [photo, setPhoto] = useState(null);

//     const [recording, setRecording] = useState(false);
//     const [video, setVideo] = useState(null);


//     const player = useVideoPlayer(video, (player) => {
//         player.loop = true;
//     });


//     if (!permission || !microphonePermission) {
//         return (
//             <View style={style.root}>
//                 <Text>Permission is loading...</Text>
//             </View>
//         )
//     }


//     if (!permission.granted || !microphonePermission.granted) {
//         return (
//             <View style={style.root}>

//                 <Text>Camera and Microphone Permission Required</Text>

//                 {!permission.granted && (
//                     <Button
//                         title="Camera Permission"
//                         onPress={requestPermission}
//                     />
//                 )}

//                 {!microphonePermission.granted && (
//                     <Button
//                         title="Microphone Permission"
//                         onPress={requestMicrophonePermission}
//                     />
//                 )}

//             </View>
//         )
//     }


//     const handleFlipCamera = () => {
//         setFlip((prev) => prev === "back" ? "front" : "back")
//     }


//     const handleFlash = () => {
//         setFlash((prev) => {
//             if (prev === "off") return "on";
//             if (prev === "on") return "auto";
//             return "off";
//         })
//     }


//     const handleClickPictures = async () => {
//         const result = await cameraRef.current?.takePictureAsync();

//         console.log(result);

//         if (result) {
//             setPhoto(result.uri)
//         }
//     }


//     const handleStartRecording = async () => {

//         if (!cameraRef.current) {
//             return;
//         }

//         setRecording(true);

//         const result = await cameraRef.current.recordAsync();

//         console.log(result);

//         if (result) {
//             setVideo(result.uri)
//         }

//         setRecording(false);
//     }


//     const handleStopRecording = () => {

//         if (cameraRef.current) {
//             cameraRef.current.stopRecording();
//         }

//     }


//     const handlePlayVideo = () => {
//         player.play();
//     }


//     const handlePauseVideo = () => {
//         player.pause();
//     }


//     return (
//         <View style={style.container}>

//             <CameraView
//                 ref={cameraRef}
//                 style={style.camera}
//                 facing={flip}
//                 flash={flash}
//                 zoom={zoom}
//                 mode="video"
//             />


//             <Slider
//                 style={style.slider}
//                 minimumValue={0}
//                 maximumValue={1}
//                 value={zoom}
//                 onValueChange={setZoom}
//             />


//             <View style={style.buttonContainer}>

//                 <Button
//                     title="Flip Camera"
//                     onPress={handleFlipCamera}
//                 />

//                 <Button
//                     title="Click Pictures"
//                     onPress={handleClickPictures}
//                 />

//                 <Button
//                     title="Flash"
//                     onPress={handleFlash}
//                 />


//                 {!recording ? (
//                     <Button
//                         title="Start Recording"
//                         onPress={handleStartRecording}
//                     />
//                 ) : (
//                     <Button
//                         title="Stop Recording"
//                         onPress={handleStopRecording}
//                     />
//                 )}


//                 {recording && (
//                     <Text style={style.recordingText}>
//                         Recording...
//                     </Text>
//                 )}


//                 {photo && (
//                     <Image
//                         source={{ uri: photo }}
//                         style={style.image}
//                     />
//                 )}


//                 {video && (
//                     <View>

//                         <Text style={style.videoText}>
//                             Recorded Video
//                         </Text>

//                         <VideoView
//                             style={style.video}
//                             player={player}
//                             allowsFullscreen
//                             allowsPictureInPicture
//                         />

//                     </View>
//                 )}

//             </View>

//         </View>
//     )
// }


// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#000",
//         padding: 10,
//     },

//     root: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         paddingHorizontal: 20,
//         backgroundColor: "#fff",
//         gap: 10,
//     },

//     camera: {
//         width: "100%",
//         height: 400,
//         borderRadius: 20,
//         overflow: "hidden",
//     },

//     slider: {
//         width: "100%",
//         marginVertical: 15,
//     },

//     buttonContainer: {
//         marginTop: 10,
//         gap: 10,
//     },

//     image: {
//         width: "100%",
//         height: 250,
//         borderRadius: 15,
//         marginTop: 20,
//         resizeMode: "cover",
//     },

//     recordingText: {
//         color: "red",
//         fontSize: 18,
//         textAlign: "center",
//     },

//     videoText: {
//         color: "white",
//         fontSize: 18,
//         textAlign: "center",
//         marginTop: 10,
//         marginBottom: 10,
//     },

//     video: {
//         width: "100%",
//         height: 250,
//     },

//     videoButton: {
//         marginTop: 10,
//         gap: 10,
//     },
// });



















import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";

import { useState, useRef } from "react";

import Slider from "@react-native-community/slider";

import {
  VideoView,
  useVideoPlayer,
} from "expo-video";


export default function CameraScreen() {

  // Permission
  const [cameraPermission, requestCameraPermission] =
    useCameraPermissions();

  const [micPermission, requestMicPermission] =
    useMicrophonePermissions();


  // Camera
  const cameraRef = useRef(null);

  const [camera, setCamera] = useState("back");

  const [flash, setFlash] = useState("off");

  const [zoom, setZoom] = useState(0);


  // Photo
  const [photo, setPhoto] = useState(null);


  // Video
  const [video, setVideo] = useState(null);

  const [recording, setRecording] = useState(false);


  // Video player
  const player = useVideoPlayer(video);


  // -----------------------------
  // Permission Loading
  // -----------------------------

  if (!cameraPermission || !micPermission) {

    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );

  }


  // -----------------------------
  // Permission Screen
  // -----------------------------

  if (
    !cameraPermission.granted ||
    !micPermission.granted
  ) {

    return (
      <View style={styles.center}>

        <Text>
          Camera and Microphone Permission Required
        </Text>


        {!cameraPermission.granted && (

          <Button
            title="Allow Camera"
            onPress={requestCameraPermission}
          />

        )}


        {!micPermission.granted && (

          <Button
            title="Allow Microphone"
            onPress={requestMicPermission}
          />

        )}

      </View>
    );

  }


  // -----------------------------
  // Switch Camera
  // -----------------------------

  const switchCamera = () => {

    setCamera(
      camera === "back"
        ? "front"
        : "back"
    );

  };


  // -----------------------------
  // Flash
  // -----------------------------

  const changeFlash = () => {

    if (flash === "off") {
      setFlash("on");
    }

    else if (flash === "on") {
      setFlash("auto");
    }

    else {
      setFlash("off");
    }

  };


  // -----------------------------
  // Take Photo
  // -----------------------------

  const takePhoto = async () => {

    const result =
      await cameraRef.current.takePictureAsync();

    setPhoto(result.uri);

  };


  // -----------------------------
  // Start / Stop Video
  // -----------------------------

  const recordVideo = async () => {

    if (recording) {

      cameraRef.current.stopRecording();

      return;

    }


    setRecording(true);

    const result =
      await cameraRef.current.recordAsync();


    if (result) {

      setVideo(result.uri);

    }

    setRecording(false);

  };


  // -----------------------------
  // UI
  // -----------------------------

  return (

    <View style={styles.container}>

      <CameraView
        ref={cameraRef}
        style={styles.camera}

        facing={camera}

        flash={flash}

        zoom={zoom}

        mode="video"
      />


      {/* Zoom */}

      <Slider
        minimumValue={0}
        maximumValue={1}
        value={zoom}
        onValueChange={setZoom}
      />


      {/* Buttons */}

      <Button
        title="🔄 Switch Camera"
        onPress={switchCamera}
      />


      <Button
        title="⚡ Flash"
        onPress={changeFlash}
      />


      <Button
        title="📸 Take Photo"
        onPress={takePhoto}
      />


      <Button
        title={
          recording
            ? "⏹ Stop Recording"
            : "🎥 Start Recording"
        }

        onPress={recordVideo}
      />


      {/* Recording Text */}

      {recording && (

        <Text style={styles.recording}>
          🔴 Recording...
        </Text>

      )}


      {/* Photo */}

      {photo && (

        <Image
          source={{ uri: photo }}
          style={styles.image}
        />

      )}


      {/* Video */}

      {video && (

        <View>

          <Text style={styles.videoText}>
            Recorded Video
          </Text>


          <VideoView
            player={player}
            style={styles.video}
            allowsFullscreen
            allowsPictureInPicture
          />

        </View>

      )}

    </View>

  );

}


// -----------------------------
// Styles
// -----------------------------

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "black",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  camera: {
    width: "100%",
    height: 400,
  },

  recording: {
    color: "red",
    textAlign: "center",
    fontSize: 18,
  },

  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },

  videoText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    margin: 10,
  },

  video: {
    width: "100%",
    height: 200,
  },

});




























// import { View, Text, StyleSheet } from "react-native";

// export default function CameraScreen() {
//     return (
//         <View style={styles.container}>
//             <Text>Camera Screen</Text>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });




// import React, { useRef, useState } from "react";

// import {
//   View,
//   Text,
//   Button,
//   StyleSheet,
//   Alert,
// } from "react-native";

// import {
//   CameraView,
//   useCameraPermissions,
// } from "expo-camera";


// export default function App() {

//   // --------------------------------
//   // CAMERA REFERENCE
//   // --------------------------------

//   const cameraRef = useRef(null);


//   // --------------------------------
//   // CAMERA PERMISSION
//   // --------------------------------

//   const [permission, requestPermission] =
//     useCameraPermissions();


//   // --------------------------------
//   // CAMERA SETTINGS
//   // --------------------------------

//   const [facing, setFacing] =
//     useState("back");

//   const [flash, setFlash] =
//     useState("off");


//   // --------------------------------
//   // VIDEO RECORDING STATE
//   // --------------------------------

//   const [isRecording, setIsRecording] =
//     useState(false);


//   // --------------------------------
//   // QR / BARCODE STATE
//   // --------------------------------

//   const [scanned, setScanned] =
//     useState(false);

//   const [scanResult, setScanResult] =
//     useState("");


//   // =========================================
//   // 1. PERMISSION NOT DETERMINED YET
//   // =========================================

//   if (!permission) {
//     return (
//       <View style={styles.center}>
//         <Text>
//           Checking camera permission...
//         </Text>
//       </View>
//     );
//   }


//   // =========================================
//   // 2. PERMISSION NOT GRANTED
//   // =========================================

//   if (!permission.granted) {
//     return (
//       <View style={styles.center}>

//         <Text style={styles.permissionText}>
//           Camera permission is required.
//         </Text>

//         <Button
//           title="Allow Camera"
//           onPress={requestPermission}
//         />

//       </View>
//     );
//   }


//   // =========================================
//   // 3. TAKE PHOTO
//   // =========================================

//   const takePhoto = async () => {

//     try {

//       const photo =
//         await cameraRef.current.takePictureAsync({
//           quality: 0.8,
//         });

//       console.log("Photo URI:", photo.uri);

//       Alert.alert(
//         "Photo Captured",
//         photo.uri
//       );

//     } catch (error) {

//       console.log(
//         "Photo error:",
//         error
//       );

//       Alert.alert(
//         "Error",
//         "Could not take photo"
//       );
//     }
//   };


//   // =========================================
//   // 4. START VIDEO RECORDING
//   // =========================================

//   const startRecording = async () => {

//     try {

//       setIsRecording(true);

//       const video =
//         await cameraRef.current.recordAsync();

//       console.log(
//         "Video URI:",
//         video.uri
//       );

//       Alert.alert(
//         "Video Recorded",
//         video.uri
//       );

//     } catch (error) {

//       console.log(
//         "Recording error:",
//         error
//       );

//     } finally {

//       setIsRecording(false);

//     }
//   };


//   // =========================================
//   // 5. STOP VIDEO RECORDING
//   // =========================================

//   const stopRecording = () => {

//     cameraRef.current.stopRecording();

//   };


//   // =========================================
//   // 6. SWITCH FRONT / BACK CAMERA
//   // =========================================

//   const switchCamera = () => {

//     setFacing(
//       facing === "back"
//         ? "front"
//         : "back"
//     );

//   };


//   // =========================================
//   // 7. TOGGLE FLASH
//   // =========================================

//   const toggleFlash = () => {

//     setFlash(
//       flash === "off"
//         ? "on"
//         : "off"
//     );

//   };


//   // =========================================
//   // 8. QR / BARCODE SCANNING
//   // =========================================

//   const handleBarcodeScanned = ({
//     type,
//     data,
//   }) => {

//     if (scanned) {
//       return;
//     }

//     setScanned(true);
//     setScanResult(data);

//     Alert.alert(
//       "Code Scanned",
//       `Type: ${type}\nData: ${data}`
//     );
//   };


//   // =========================================
//   // 9. RESET SCANNER
//   // =========================================

//   const scanAgain = () => {

//     setScanned(false);
//     setScanResult("");

//   };


//   // =========================================
//   // USER INTERFACE
//   // =========================================

//   return (

//     <View style={styles.container}>

//       {/* ================================
//           CAMERA
//       ================================= */}

//       <CameraView
//         ref={cameraRef}

//         style={styles.camera}

//         facing={facing}

//         flash={flash}

//         autofocus="on"

//         mute={false}

//         onBarcodeScanned={
//           scanned
//             ? undefined
//             : handleBarcodeScanned
//         }
//       />


//       {/* ================================
//           TOP INFORMATION
//       ================================= */}

//       <View style={styles.topBar}>

//         <Text style={styles.infoText}>
//           Camera: {facing}
//         </Text>

//         <Text style={styles.infoText}>
//           Flash: {flash}
//         </Text>

//         {isRecording && (
//           <Text style={styles.recordingText}>
//             🔴 RECORDING
//           </Text>
//         )}

//       </View>


//       {/* ================================
//           SCAN RESULT
//       ================================= */}

//       {scanResult !== "" && (

//         <View style={styles.scanBox}>

//           <Text style={styles.scanText}>
//             Scanned:
//           </Text>

//           <Text style={styles.scanData}>
//             {scanResult}
//           </Text>

//           <Button
//             title="Scan Again"
//             onPress={scanAgain}
//           />

//         </View>

//       )}


//       {/* ================================
//           CONTROLS
//       ================================= */}

//       <View style={styles.controls}>

//         {/* Camera Switch */}

//         <Button
//           title="🔄 Switch"
//           onPress={switchCamera}
//         />


//         {/* Flash */}

//         <Button
//           title={
//             flash === "off"
//               ? "⚡ Flash ON"
//               : "⚡ Flash OFF"
//           }
//           onPress={toggleFlash}
//         />


//         {/* Photo */}

//         <Button
//           title="📸 Photo"
//           onPress={takePhoto}
//         />


//         {/* Video */}

//         {isRecording ? (

//           <Button
//             title="⏹ Stop"
//             onPress={stopRecording}
//           />

//         ) : (

//           <Button
//             title="🎥 Record"
//             onPress={startRecording}
//           />

//         )}

//       </View>

//     </View>
//   );
// }


// // =========================================
// // STYLES
// // =========================================

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     backgroundColor: "black",
//   },

//   camera: {
//     flex: 1,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },

//   permissionText: {
//     fontSize: 18,
//     marginBottom: 20,
//     textAlign: "center",
//   },

//   topBar: {
//     position: "absolute",
//     top: 50,
//     left: 15,
//     right: 15,

//     flexDirection: "row",

//     justifyContent: "space-between",

//     alignItems: "center",
//   },

//   infoText: {
//     color: "white",
//     fontSize: 14,
//     backgroundColor: "rgba(0,0,0,0.5)",
//     padding: 8,
//     borderRadius: 8,
//   },

//   recordingText: {
//     color: "red",
//     fontWeight: "bold",
//     backgroundColor: "white",
//     padding: 8,
//     borderRadius: 8,
//   },

//   scanBox: {
//     position: "absolute",

//     bottom: 170,
//     left: 20,
//     right: 20,

//     backgroundColor: "white",

//     padding: 15,

//     borderRadius: 10,
//   },

//   scanText: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },

//   scanData: {
//     fontSize: 14,
//     marginVertical: 10,
//   },

//   controls: {
//     position: "absolute",

//     bottom: 30,
//     left: 10,
//     right: 10,

//     flexDirection: "row",

//     justifyContent: "space-around",

//     alignItems: "center",
//   },

// });



