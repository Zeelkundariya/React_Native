import { useRef } from "react";
import {Text, StyleSheet, View, Button} from "react-native";
import {CameraView, useCameraPermissions} from "expo-camera"

export default function CameraScreen(){
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

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
            <CameraView style={style.camera} facing="back" ref={cameraRef}/>
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
    }
})