import { useRef, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import Slider from "@react-native-community/slider";

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [zoom, setZoom] = useState(0);
    const [flash, setflash] = useState(0);
    const [photo, setPhoto] = useState(null)
    const [facing, setFacing] = useState("back");

    const changeCamera = () => {
        if (facing === "back") {
            setFacing("front");
        } else {
            setFacing("back");
        }
    }


    if (!permission?.granted) {
        return (
            <View>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }


    const handleClickPicture = async () => {
        const result = await cameraRef?.current?.takePictureAsync();
        console.log(result);

        if (result) {
            setPhoto(result.uri)
        }


    }
    return (
        <View style={style.container}>
            <Text style={style.title}> Camera Demo Start</Text>

            <CameraView
                style={style.camera} facing={facing} ref={cameraRef} zoom={zoom} flash="off" mirror={true} />

            <Text style={style.zoomText}>
                Zoom: {Math.round(zoom * 100)}%
            </Text>

            <Slider
                style={style.slider} minimumValue={0} maximumValue={1} value={zoom} onValueChange={setZoom} />

            <TouchableOpacity style={style.button} onPress={changeCamera}>
                <Text style={style.buttonText}>Switch Camera</Text> </TouchableOpacity>


            <Button title="Click Picture" onPress={handleClickPicture} />

            {photo && (
                <Image source={{ uri: photo }} style={style.photo} />)}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: "white"
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15
    },

    camera: {
        width: "100%",
        height: 350,
        borderRadius: 15,
        marginBottom: 15
    },

    zoomText: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 5
    },

    slider: {
        width: "100%",
        height: 40,
        marginBottom: 10
    },

    button: {
        width: "100%",
        height: 50,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        marginBottom: 15
    },

    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold"
    },

    photo: {
        width: "100%",
        height: 200,
        marginTop: 15,
        borderRadius: 10
    }
})

// import { useRef, useState } from "react";
// import {StyleSheet, Text, Button} from "react-native"
// import {CameraView, useCameraPermissions} from "expo-camera"

// export default function (){
//     const [permission, requestPermission] = useCameraPermissions();
//     const CameraRef = useRef(null);
//     const [zoom , setZoom] = useState(0)
// }

// if(!permission?.granted){
//     return(
//         <View>
//             <Button title="Permission granted" onPress={requestPermission}/>
//         </View>
//     )
// }
// return(
//     <View>
//         <Text></Text>

//         <CameraView style={style.camera} facing="front" zoom={zoom}/>

//         <Slider style={style.slider} value={zoom} minimunvalue={0} maximumvalue={1} onValueChange={setZoom}/>
//     </View>
// )


// setfacing(facing === "back" ? "front": "back")