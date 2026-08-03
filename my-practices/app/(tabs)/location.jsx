import { View, Button, StyleSheet } from "react-native";
import * as Location from "expo-location"

export default function LocationScreen(){
    const handleLocationPermission= async()=>{
        const result = await Location.requestForegroundPermissionsAsync();

        if(!result.granted){
            Alert.alert("Success","Permission Denied")
        }
        console.log(result);

        const res = await Location.getCurrentPositionAsync();
    }


    return (
        <View style={style.container}>
            <Button title="Get current location" onPress={handleLocationPermission}/>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
})