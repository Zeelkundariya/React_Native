// // import { View, StyleSheet, Button, Text, Image } from "react-native";
// // import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// // import { useState, useRef } from "react";
// // import Slider from "@react-native-community/slider";
// // import { VideoView, useVideoPlayer } from "expo-video";


// // export default function CameraScreen() {
// //     const [permission, requestPermission] = useCameraPermissions();
// //     const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();

// //     const [flip, setFlip] = useState("back");
// //     const [flash, setFlash] = useState("off");
// //     const [zoom, setZoom] = useState(0);
// //     const cameraRef = useRef(null);
// //     const [photo, setPhoto] = useState(null);

// //     const [recording, setRecording] = useState(false);
// //     const [video, setVideo] = useState(null);


// //     const player = useVideoPlayer(video, (player) => {
// //         player.loop = true;
// //     });


// //     if (!permission || !microphonePermission) {
// //         return (
// //             <View style={style.root}>
// //                 <Text>Permission is loading...</Text>
// //             </View>
// //         )
// //     }


// //     if (!permission.granted || !microphonePermission.granted) {
// //         return (
// //             <View style={style.root}>

// //                 <Text>Camera and Microphone Permission Required</Text>

// //                 {!permission.granted && (
// //                     <Button
// //                         title="Camera Permission"
// //                         onPress={requestPermission}
// //                     />
// //                 )}

// //                 {!microphonePermission.granted && (
// //                     <Button
// //                         title="Microphone Permission"
// //                         onPress={requestMicrophonePermission}
// //                     />
// //                 )}

// //             </View>
// //         )
// //     }


// //     const handleFlipCamera = () => {
// //         setFlip((prev) => prev === "back" ? "front" : "back")
// //     }


// //     const handleFlash = () => {
// //         setFlash((prev) => {
// //             if (prev === "off") return "on";
// //             if (prev === "on") return "auto";
// //             return "off";
// //         })
// //     }


// //     const handleClickPictures = async () => {
// //         const result = await cameraRef.current?.takePictureAsync();

// //         console.log(result);

// //         if (result) {
// //             setPhoto(result.uri)
// //         }
// //     }


// //     const handleStartRecording = async () => {

// //         if (!cameraRef.current) {
// //             return;
// //         }

// //         setRecording(true);

// //         const result = await cameraRef.current.recordAsync();

// //         console.log(result);

// //         if (result) {
// //             setVideo(result.uri)
// //         }

// //         setRecording(false);
// //     }


// //     const handleStopRecording = () => {

// //         if (cameraRef.current) {
// //             cameraRef.current.stopRecording();
// //         }

// //     }


// //     const handlePlayVideo = () => {
// //         player.play();
// //     }


// //     const handlePauseVideo = () => {
// //         player.pause();
// //     }


// //     return (
// //         <View style={style.container}>

// //             <CameraView
// //                 ref={cameraRef}
// //                 style={style.camera}
// //                 facing={flip}
// //                 flash={flash}
// //                 zoom={zoom}
// //                 mode="video"
// //             />


// //             <Slider
// //                 style={style.slider}
// //                 minimumValue={0}
// //                 maximumValue={1}
// //                 value={zoom}
// //                 onValueChange={setZoom}
// //             />


// //             <View style={style.buttonContainer}>

// //                 <Button
// //                     title="Flip Camera"
// //                     onPress={handleFlipCamera}
// //                 />

// //                 <Button
// //                     title="Click Pictures"
// //                     onPress={handleClickPictures}
// //                 />

// //                 <Button
// //                     title="Flash"
// //                     onPress={handleFlash}
// //                 />


// //                 {!recording ? (
// //                     <Button
// //                         title="Start Recording"
// //                         onPress={handleStartRecording}
// //                     />
// //                 ) : (
// //                     <Button
// //                         title="Stop Recording"
// //                         onPress={handleStopRecording}
// //                     />
// //                 )}


// //                 {recording && (
// //                     <Text style={style.recordingText}>
// //                         Recording...
// //                     </Text>
// //                 )}


// //                 {photo && (
// //                     <Image
// //                         source={{ uri: photo }}
// //                         style={style.image}
// //                     />
// //                 )}


// //                 {video && (
// //                     <View>

// //                         <Text style={style.videoText}>
// //                             Recorded Video
// //                         </Text>

// //                         <VideoView
// //                             style={style.video}
// //                             player={player}
// //                             allowsFullscreen
// //                             allowsPictureInPicture
// //                         />

// //                     </View>
// //                 )}

// //             </View>

// //         </View>
// //     )
// // }


// // const style = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         backgroundColor: "#000",
// //         padding: 10,
// //     },

// //     root: {
// //         flex: 1,
// //         justifyContent: "center",
// //         alignItems: "center",
// //         paddingHorizontal: 20,
// //         backgroundColor: "#fff",
// //         gap: 10,
// //     },

// //     camera: {
// //         width: "100%",
// //         height: 400,
// //         borderRadius: 20,
// //         overflow: "hidden",
// //     },

// //     slider: {
// //         width: "100%",
// //         marginVertical: 15,
// //     },

// //     buttonContainer: {
// //         marginTop: 10,
// //         gap: 10,
// //     },

// //     image: {
// //         width: "100%",
// //         height: 250,
// //         borderRadius: 15,
// //         marginTop: 20,
// //         resizeMode: "cover",
// //     },

// //     recordingText: {
// //         color: "red",
// //         fontSize: 18,
// //         textAlign: "center",
// //     },

// //     videoText: {
// //         color: "white",
// //         fontSize: 18,
// //         textAlign: "center",
// //         marginTop: 10,
// //         marginBottom: 10,
// //     },

// //     video: {
// //         width: "100%",
// //         height: 250,
// //     },

// //     videoButton: {
// //         marginTop: 10,
// //         gap: 10,
// //     },
// // });


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