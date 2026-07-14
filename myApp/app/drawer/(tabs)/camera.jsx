import {StyleSheet, Text, View, Button, Image} from 'react-native'
import React, { useRef, useState } from 'react'

import {CameraView, useCameraPermissions} from "expo-camera"

const Camera = () => {
    const CameraRef = useRef(null)
    const [facing, setFacing] = useState("back")
    const [permission, setPermission] = useCameraPermissions()
    const [photo, setPhoto] = useState(null)

    if(!permission){
        return <View></View>
    }

    if(!permission.granted){
        return(
            <View> 
                <Button title="Grant Permission" onPress={setPermission}></Button>
            </View>
        )
    }

    const takePhoto = async()=>{
        const result = await CameraRef.current?.takePictureAsync()

        if(result){
            setPhoto(result.uri)
        }
    }

    return(
        <View style={styles.container}>
            <CameraView 
                ref={CameraRef} 
                style={styles.camera} 
                facing={facing}
            />

            <Button 
                title="Flip Camera" 
                onPress={()=>setFacing(facing === "back" ? "front" : "back")}
            />

            <Button 
                title="Click Picture" 
                onPress={takePhoto}
            />

            {
                photo &&(
                    <Image 
                        source={{uri:photo}} 
                        style={{
                            width:120,
                            height:120,
                            margin:20
                        }}
                    />
                )
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camera:{
        flex:1
    }
})

export default Camera;