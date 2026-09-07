import {View, Text, Button, StyleSheet} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";


export default function LocalAuthentication(){
    const handleAuth = async()=>{
        const res = await LocalAuth.hasHardwareAysnc();
        console.log(res);
    }
    return(
        <View style={style.container}>
            <Text>Authentication</Text>

            <Button title="Auth" onPress={handleAuth}/> 
        </View>
    )
}


const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }

})
