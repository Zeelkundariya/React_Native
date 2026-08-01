

// import { View, Text, Button, StyleSheet } from "react-native"
// import { CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
// import { useRef, useState } from "react";
// import { VideoView, useVideoPlayer } from "expo-video"


// export default function CameraScreen() {
//     const videoRef = useRef(null)
//     const [permission, requestPermission] = useCameraPermissions();
//     const [micPermission, micRequestPermission] = useMicrophonePermissions();
//     const [ video, setVideo ] = useState(null)
//     const [ recording, setRecording ] = useState(false);
//     const player = useVideoPlayer(video);


//     const handleStartRecording = async () => {
//         setRecording(true)
//         const result = await videoRef?.current?.recordAsync();
//         console.log(result);

//         if (result) {
//             setVideo(result.uri)
//         }
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
//             <CameraView style={{ width: "100%",height: 450}} mode="video" ref={videoRef} />

//             <Button title="Start Recording" onPress={handleStartRecording} disabled={recording} />

//             <Button title="Stop Recording" onPress={handleStopRecording} disabled={!recording} />


//             {video && (
//                 <VideoView player={player} style={{width: "100%", height: 250,}}/>
//             )}
//         </View>
//     )
// }



import { View, Text, Button } from "react-native";
import { cameraView, useCameraPermissions, useMicrophonePermissions, } from "expo-camera";
import { useRef , useState} from "react";
import { VideoView, useVideoPlayer } from "expo-video"


export default function CameraScreen() {
    const videoRef = useRef(null);
    const [permission, requestPermission] = useCameraPermissions();
    const [useMicrophonePermissions, micrequestPermission] = useMicrophonePermissions();
    const [video, setVideo] = useState(null);
    const [recording, setRecording] = useState(false);
    const player = useVideoPlayer(video);

    const handleStartRecording = async () => {
        setRecording(true)
        const result = await videoRef?.current.recordAsync();
        console.log(result)

        if (result) {
            setVideo(video.uri)
        }
        setRecording(false)
    }

    const handleEndingRecording = async () => {
        videoRef.current.stopRecording();
        setRecording(false);
    }

    if (!permission?.granted) {
        return (
            <View>
                <Button title="Permission granted" onPress={requestPermission} />
            </View>
        )
    }

    if (!micPermission?.granted) {
        return (
            <View>
                <Button title=" micPermission" onPress={micrequestPermission} />
            </View>
        )
    }

    return (
        <View>
            <cameraView ref={videoRef} mode="video" />

            <Button title="Start Recording" onPress={handleStartRecording} disabled={recording} />

            <Button title="End Recording" onPress={handleEndingRecording} disabled={!recording} />

            {video && (
                <VideoView player={player} style={{width="100%", height=250}}/>
            )}


        </View>
    )
}3
