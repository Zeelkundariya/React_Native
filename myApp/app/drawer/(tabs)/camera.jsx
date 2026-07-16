import {StyleSheet, View, Button, Image, ScrollView, Alert} from 'react-native'
import React, { useRef, useState } from 'react'

import {CameraView, useCameraPermissions} from "expo-camera"
import {MediaLibrary} from "expo-media-library"

const Camera = () => {
    const CameraRef = useRef(null)

    const [facing, setFacing] = useState("back")
    const [permission, setPermission] = useCameraPermissions()
    const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions()
    const [photos, setPhotos] = useState([])

    if(!permission || !mediaPermission){
        return <View></View>
    }

    if(!permission.granted){
        return(
            <View>
                <Button 
                    title="Grant Camera Permission" 
                    onPress={setPermission}
                />
            </View>
        )
    }

    if(!mediaPermission.granted){
        return(
            <View>
                <Button 
                    title="Grant Media Permission"
                    onPress={requestMediaPermission}
                />
            </View>
        )
    }

    const takePhoto = async()=>{
        const result = await CameraRef.current?.takePictureAsync()

        if(result){
            setPhotos([...photos, result.uri])

            await MediaLibrary.saveToLibraryAsync(result.uri)

            Alert.alert("Success", "Photo Saved")
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
                onPress={()=>setFacing(
                    facing === "back" ? "front" : "back"
                )}
            />

            <Button 
                title="Click Picture" 
                onPress={takePhoto}
            />

            <ScrollView horizontal>

                {
                    photos.map((photo, index)=>(
                        <Image
                            key={index}
                            source={{uri:photo}}
                            style={{
                                width:120,
                                height:120,
                                margin:10
                            }}
                        />
                    ))
                }

            </ScrollView>

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