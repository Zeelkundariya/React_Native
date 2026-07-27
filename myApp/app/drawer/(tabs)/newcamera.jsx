import { useRef, useState } from "react";
import {Text, StyleSheet, View, Button, TouchableOpacity} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera";
import Slider from "@react-native-community/slider";

export default function CameraScreen(){
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [zoom, setZoom] = useState(0);
    const [facing, setFacing] = useState("back");

    const changeCamera = () => {
        if(facing === "back"){
            setFacing("front");
        }else{
            setFacing("back");
        }
    }

    if(!permission?.granted){
        return(
            <View>
                <Button title="Grant Permission" onPress={requestPermission}/>
            </View>
        );
    }

    return(
        <View style={style.container}>
            <Text style={style.title}> Camera Demo Start</Text>

            <CameraView 
                style={style.camera} 
                facing={facing}
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

            <TouchableOpacity style={style.button} onPress={changeCamera}>
                <Text style={style.buttonText}>Switch Camera</Text>
            </TouchableOpacity>

        </View>
    );
}

const style = StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        backgroundColor:"white"
    },

    title:{
        fontSize:20,
        fontWeight:"bold",
        textAlign:"center"
    },

    camera:{
        width:"100%",
        height:400,
        marginTop:20
    },

    zoomText:{
        fontSize:18,
        textAlign:"center",
        marginTop:15
    },

    slider:{
        width:"100%",
        height:40
    },

    button:{
        width:"100%",
        height:50,
        backgroundColor:"black",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginTop:10
    },

    buttonText:{
        color:"white",
        fontSize:16,
        fontWeight:"bold"
    }
})