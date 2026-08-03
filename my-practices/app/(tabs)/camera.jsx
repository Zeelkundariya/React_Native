// import { View, StyleSheet, Button, Text, Image, ScrollView } from "react-native";
// import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// import { useState, useRef } from "react";
// import Slider from "@react-native-community/slider";
// import { VideoView, useVideoPlayer } from "expo-video";


// export default function CameraScreen() {
//     const cameraRef = useRef(null);
//     const [permission, requestPermission] = useCameraPermissions();
//     const [micPermission, micRequestPermission] = useMicrophonePermissions();
//     const [flip, setFlip] = useState("back");
//     const [flash, setFlash] = useState("off");
//     const [zoom, setZoom] = useState(0);
//     const [photo, setPhoto] = useState(null);
//     const [video, setVideo] = useState(null);
//     const [recording, setRecording] = useState(false);
//     const player = useVideoPlayer(video);


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
//         const result = await cameraRef?.current?.takePictureAsync();
//         console.log(result);

//         if (result) {
//             setPhoto(result.uri)
//         }
//     }


//     const handleStartRecording = async () => {
//         setRecording(true)

//         const result = await cameraRef?.current?.recordAsync();
//         console.log(result)

//         if (result) {
//             setVideo(result.uri)
//         }

//         setRecording(false)
//     }


//     const handleEndingRecording = async () => {
//         cameraRef?.current?.stopRecording();
//         setRecording(false);
//     }


//     if (!permission?.granted) {
//         return (
//             <View style={style.root}>
//                 <Text>Camera Permission Required</Text>

//                 <Button
//                     title="Permission Granted"
//                     onPress={requestPermission}
//                 />
//             </View>
//         )
//     }


//     if (!micPermission?.granted) {
//         return (
//             <View style={style.root}>
//                 <Text>Microphone Permission Required</Text>

//                 <Button
//                     title="Mic Permission"
//                     onPress={micRequestPermission}
//                 />
//             </View>
//         )
//     }


//     return (
//         <ScrollView
//             style={style.container}
//             contentContainerStyle={style.contentContainer}
//         >

//             <CameraView
//                 ref={cameraRef}
//                 style={style.camera}
//                 facing={flip}
//                 flash={flash}
//                 zoom={zoom}
//                 mode="video"
//             />


//             <View style={{ height: 20 }} />


//             <Text style={style.text}>
//                 Zoom
//             </Text>

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


//                 <Button
//                     title="Start Recording"
//                     onPress={handleStartRecording}
//                     disabled={recording}
//                 />


//                 <Button
//                     title="End Recording"
//                     onPress={handleEndingRecording}
//                     disabled={!recording}
//                 />

//             </View>


//             {recording && (
//                 <Text style={style.recordingText}>
//                     Recording...
//                 </Text>
//             )}


//             {photo && (
//                 <View>
//                     <Text style={style.title}>
//                         Captured Photo
//                     </Text>

//                     <Image
//                         source={{ uri: photo }}
//                         style={style.image}
//                     />
//                 </View>
//             )}


//             {video && (
//                 <View>
//                     <Text style={style.title}>
//                         Recorded Video
//                     </Text>

//                     <VideoView
//                         player={player}
//                         style={style.video}
//                         nativeControls
//                         allowsFullscreen
//                     />
//                 </View>
//             )}

//         </ScrollView>
//     )
// }


// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#000",
//     },

//     contentContainer: {
//         padding: 10,
//         paddingBottom: 40,
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
//         height: 500,
//         borderRadius: 20,
//         overflow: "hidden",
//     },

//     text: {
//         color: "#fff",
//         textAlign: "center",
//         fontSize: 16,
//     },

//     slider: {
//         width: "100%",
//         marginVertical: 15,
//     },

//     buttonContainer: {
//         marginTop: 10,
//         gap: 10,
//     },

//     recordingText: {
//         color: "red",
//         textAlign: "center",
//         fontSize: 18,
//         marginTop: 15,
//     },

//     title: {
//         color: "#fff",
//         textAlign: "center",
//         fontSize: 18,
//         marginTop: 20,
//         marginBottom: 10,
//     },

//     image: {
//         width: "100%",
//         height: 250,
//         borderRadius: 15,
//         resizeMode: "cover",
//     },

//     video: {
//         width: "100%",
//         height: 250,
//         borderRadius: 15,
//     },
// });