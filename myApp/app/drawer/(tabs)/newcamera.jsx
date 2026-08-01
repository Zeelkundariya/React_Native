// import { useRef, useState } from "react";
// import { Text, StyleSheet, View, Button, TouchableOpacity, Image } from "react-native";
// import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// import Slider from "@react-native-community/slider";

// export default function CameraScreen() {
//     const [permission, requestPermission] = useCameraPermissions();
//     const [micPermission, requestMicPermission] = useMicrophonePermissions();
//     const cameraRef = useRef(null);
//     const [zoom, setZoom] = useState(0);
//     const [photo, setPhoto] = useState(null);
//     const [video, setVideo] = useState(null);
//     const [facing, setFacing] = useState("back");
//     const [recording, setRecording] = useState(false);

//     const changeCamera = () => {
//         if (facing === "back") {
//             setFacing("front");
//         }else{
//             setFacing("back");
//         }
//     }

//     if (!permission?.granted) {
//         return (
//             <View>
//                 <Button
//                     title="Grant Camera Permission"
//                     onPress={requestPermission}
//                 />
//             </View>
//         );
//     }

//     if (!micPermission?.granted) {
//         return (
//             <View>
//                 <Button
//                     title="Grant Microphone Permission"
//                     onPress={requestMicPermission}
//                 />
//             </View>
//         );
//     }

//     const handleClickPicture = async () => {
//         const result = await cameraRef.current?.takePictureAsync();

//         console.log(result);

//         if (result) {
//             setPhoto(result.uri);
//         }
//     }

//     const handleStartRecording = async () => {
//         setRecording(true);

//         const result = await cameraRef.current?.recordAsync();

//         console.log(result);

//         if (result){
//             setVideo(result.uri);
//         }
//         setRecording(false);
//     }

//     const handleEndingRecording = () => {
//         cameraRef.current?.stopRecording();
//     }
//     return (
//         <View style={style.container}>

//             <Text style={style.title}>Camera Demo Start</Text>

//             <CameraView style={style.camera}facing={facing}ref={cameraRef}zoom={zoom} mode="video"mirror={true}  />

//             <Text style={style.zoomText}>
//                 Zoom: {Math.round(zoom * 100)}%
//             </Text>

//             <Slider
//                 style={style.slider}
//                 minimumValue={0}
//                 maximumValue={1}
//                 value={zoom} onValueChange={setZoom} />

//             <TouchableOpacity
//                 style={style.button}
//                 onPress={changeCamera}
//             >
//                 <Text style={style.buttonText}>
//                     Switch Camera
//                 </Text>
//             </TouchableOpacity>

//             <Button
//                 title="Click Picture"
//                 onPress={handleClickPicture}
//             />

//             <View style={style.space}/>

//             <Button
//                 title="Start Recording"
//                 onPress={handleStartRecording}
//                 disabled={recording}
//             />

//             <View style={style.space}/>

//             <Button
//                 title="Stop Recording"
//                 onPress={handleEndingRecording}
//                 disabled={!recording}
//             />

//             {recording && (
//                 <Text style={style.recordingText}>
//                     Recording...
//                 </Text>
//             )}

//             {photo && (
//                 <Image
//                     source={{ uri: photo }}
//                     style={style.photo}
//                 />
//             )}

//             {video && (
//                 <Text style={style.videoText}>
//                     Video Recorded: {video}
//                 </Text>
//             )}

//         </View>
//     );
// }

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 20,
//         paddingTop: 20,
//         paddingBottom: 20,
//         backgroundColor: "white"
//     },

//     title: {
//         fontSize: 22,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 15
//     },

//     camera: {
//         width: "100%",
//         height: 300,
//         borderRadius: 15,
//         marginBottom: 15
//     },

//     zoomText: {
//         fontSize: 16,
//         textAlign: "center",
//         marginBottom: 5
//     },

//     slider: {
//         width: "100%",
//         height: 40,
//         marginBottom: 10
//     },

//     button: {
//         width: "100%",
//         height: 50,
//         backgroundColor: "black",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: 10,
//         marginBottom: 15
//     },

//     buttonText: {
//         color: "white",
//         fontSize: 16,
//         fontWeight: "bold"
//     },

//     space: {
//         height: 10
//     },

//     recordingText: {
//         fontSize: 18,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginTop: 10
//     },

//     photo: {
//         width: "100%",
//         height: 200,
//         marginTop: 15,
//         borderRadius: 10
//     },

//     videoText: {
//         fontSize: 14,
//         marginTop: 15
//     }
// })



// import { Button, StyleSheet, View } from "react-native";
// import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// import { useRef, useState } from "react";
// import { videoView, useVideoPlayer } from "expo-video"

// export default function CameraScreen() {

//     const videoRef = useRef(null);
//     const [video, setVideo] = useState(null);
//     const [permission, requestPermission] = useCameraPermissions();
//     const [micPermission, micRequestPermission] = useMicrophonePermissions();
//     const player = useVideoPlayer(video);
//     const [recording, setRecording] = useState(false)

//     if (!permission?.granted) {
//         return (
//             <View>
//                 <Button title="Permission Granted" onPress={requestPermission} />
//             </View>
//         )
//     }

//     if (!micPermission?.granted) {
//         return (
//             <View>
//                 <Button title="MicPermission Granted" onPress={micrequestPermission} />
//             </View>
//         )
//     }


//     const handleStartRecording = async () => {
//         setVideo(true)
//         const result = await videoRef?.current?.recordAsync();
//         console.log(result);

//         if (result) {
//             setVideo(result.uri)
//         }
//         setVideo(false)
//     }


//     const handleEndingRecording = async () => {
//         videoRef?.current.stoprecordAsync();
//     }
//     return (
//         <View style={style.container}>
//             <CameraView style={style.camera} ref={videoRef} mode="video" />
//             <View style={style.buttonSpace}>
//                 <Button title="Start Recording" onPress={handleStartRecording} disabled={recording} isMuted="true" />

//                 <Button title="End Recording" onPress={handleEndingRecording} disabled={!recording} />
//             </View>
//             {recording && (
//                 <Text style={style.recordingText}>Start Recording..</Text>
//             )}

//             {video && (
//                 <videoView style={style.video} player={player} />
//             )}
//         </View>
//     )
// }

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: "white",
//     },

//     camera: {
//         width: "100%",
//         height: 400,
//         marginBottom: 20,
//         borderRadius: 10,
//     },

//     video: {
//         width: "100%",
//         height: 250,
//         marginTop: 20,
//     },

//     buttonContainer: {
//         marginBottom: 10,
//     },

//     recordingText: {
//         fontSize: 18,
//         textAlign: "center",
//         marginTop: 15,
//         fontWeight: "bold",
//     }
// });



// import { View, Button, StyleSheet, Text } from "react-native"
// import { cameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera"
// import { useRef, useState } from "react"
// import { videoView, useVideoPlayer } from "expo-video"

// export default function CameraScreen() {
//     const Video = useRef(null);
//     const [permission, requestPermission] = useCameraPermissions();
//     const [micPermission, requestMicPermission] = useMicrophonePermissions();
//     const [video, setVideo] = useState(null);
//     const [recording, setRecording] = useState(false);
//     const player = useVideoPlayer();



//     const handleStartRecording = async () => {
//         setRecording(true)
//         const result = await VideoRef?.current.recordAsyns();
//         console.log(result)

//         if (result) {
//             setVideo(result.uri)
//         }
//         setRecording(false)
//     }

//     const handleEndingRecording = async () => {
//         Video?.current.stopRecordAsync();
//     }


//     if (!permission?.granted) {
//         return (
//             <View>
//                 <Button title=" Permission Granted" onPress={requestPermission} />
//             </View>
//         )
//     }

//     if (!micPermission?.granted) {
//         return (
//             <View>
//                 <Button title="MicPermission Granted" onPress={requestMicPermission} />
//             </View>
//         )
//     }

//     return (
//         <View style={style.container}>
//             <cameraView style={style.camera} ref={VideoRef} mode="video" />

//             <Button title="Start Recording" onPress={handleStartRecording} disabled={recording} />

//             <Button title="Ending Recording" onPress={handleEndingRecording} disabled={!recording} />

//             {video && (
//                 <VideoView style={style.video} player={player} />
//             )}


//         </View>
//     )
// }







// import { View } from "react-native"
// import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// import { useRef, useState } from "react";
// import { VideoView, useVideoPlayer } from "expo-video"


// export default function CameraScreen() {
//     const videoRef = useRef(null)
//     const [permission, requestPermission] = useCameraPermissions();
//     const [micPermission, micRequestPermission] = useMicrophonePermissions();
//     const { video, setVideo } = useState(null)
//     const { recording, setRecording } = useStat(false);
//     const video = useVideoPlayer();


//     const handleStartRecording = async () => {
//         setRecording(true)
//         const result = await videoRef?.current?.recordAsync();
//         console.log(result);

//         if (result) {
//             setVideo(result)
//         }
//         setVideo(video.uri)
//         setRecording(false)
//     }

//     const handleStopRecording= async()=> {
//         videoRef?.current.stopRecording();
//         setRecording(false)
//     }

//     if (!permission?.granted) {
//         return (
//             <View>
//                 <Button title="Permission Granted" onPress={requestPermission} />
//             </View>
//         )
//     }

//     if (!micPermission?.granted) {
//         return (
//             <View>
//                 <Button title="MicPermission Granted" onPress={micRequestPermission} />
//             </View>
//         )
//     }


//     return (
//         <View>
//             <CameraView style={style.camera} mode="video" ref={videoRef} />

//             <Button title="Start Recording" onPress={handleStartRecording} disabled={recording} />

//             <Button title="Stop Recording" onPress={handleStopRecording} disabled={!recording} />


//             {video && (
//                 <VideoView player={player}/>
//             )}
//         </View>
//     )
// }







import { View, Button, SafeAreaView} from 'react-native';
import { CameraView,useCameraPermissions,useMicrophonePermissions } from "expo-camera";
import { useRef, useState } from 'react';
import { VideoView,useVideoPlayer } from 'expo-video';

export default function App() {
  const videoRef = useRef(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [audioPermission, requestAudioPermission] = useMicrophonePermissions();
  const [video, setVideo] = useState(null);
  const player = useVideoPlayer(video);
  console.log(player);
  
  if (!cameraPermission || !audioPermission) {
    return <View />;
  }

  if (!cameraPermission.granted || !audioPermission.granted) {
    return (
      <SafeAreaView>
        <Button title="grant permission" onPress={requestCameraPermission} />
        <View style={{ height: 20 }} />
        <Button title="grant audio permission" onPress={ requestAudioPermission} />
      </SafeAreaView>
    )
  }

  const handleStartRecording = async () => {
    const result = await videoRef.current.recordAsync();
    console.log(result);
    setVideo(result.uri);
  };

  const handleStopRecording = async () => {
    await videoRef.current.stopRecording();
    
  }

  return (
    <View style={{ flex: 1 }}>


      <CameraView style={{ flex: 1 }} ref={videoRef}  mode="video"/>
      
      <Button title="start recording" onPress={handleStartRecording} />

      <View style={{ height: 20 }} />
      
      <Button title="stop recording" onPress={handleStopRecording} />

      {video && (
        <VideoView player={player} style={ {height:300,width:"100%"}} />
      )}
      
  </View>
  )
}