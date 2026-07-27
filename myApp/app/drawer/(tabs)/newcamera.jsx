import { useRef, useState } from "react";
import {Text, StyleSheet, View, Button} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import Slider from "@react-native-community/slider";

export default function CameraScreen(){
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [zoom, setZoom] = useState(0);

    if(!permission?.granted){
        return(
            <View>
                <Button title="Grant Permission" onPress={requestPermission}/>
            </View>
        );
    }

    return(
        <View style={style.container}>
            <Text> Camera Demo Start</Text>

            <CameraView 
                style={style.camera} 
                facing="back" 
                ref={cameraRef}
                zoom={zoom}
            />

            <Text style={style.zoomText}>
                Zoom: {Math.round(zoom * 100)}%
            </Text>

            <Slider
                style={style.slider}
                minimumValue={0}
                maximumValue={1}
                value={zoom}
                onValueChange={setZoom}
            />

        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"white"
    },

    camera:{
        width:"100%",
        height:500,
        marginTop:20
    },

    zoomText:{
        fontSize:18,
        textAlign:"center",
        marginTop:20
    },

    slider:{
        width:"100%",
        height:40
    }
})