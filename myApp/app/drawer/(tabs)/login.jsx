import {Button, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'
import * as SecureStore from 'expo-secure-store'
import * as LocalAuthentication from 'expo-local-authentication'
import {router} from 'expo-router'

const Login = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {

        if(name==="Zeel" && password==="1234567"){
            await SecureStore.setItemAsync("token","Bharat45")
            await SecureStore.setItemAsync("biometric","true")
            router.replace("/home")
        }
        else{
            alert("Invalid Credentials")
        }

    }


    const handleBiometric = async() => {

        const token = await SecureStore.getItemAsync("token")
        const biometric = await SecureStore.getItemAsync("biometric")

        if(!token || biometric!=="true"){
            alert("login with username and password")
            return
        }

        const hasHardWare = await LocalAuthentication.hasHardwareAsync()

        if(!hasHardWare){
            alert("Biometric does not support")
            return
        }

        const isEnrolled = await LocalAuthentication.isEnrolledAsync()

        if(!isEnrolled){
            alert("Fingerprint and facelock is not required")
            return
        }

        const result = await LocalAuthentication.authenticateAsync()

        if(result.success){
            router.replace("/home")
        }
        else{
            alert("Invalid Credentials")
        }

    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput style={styles.input}placeholder="Enter name..." value={name} onChangeText={setName} />

            <TextInput style={styles.input} placeholder="Enter password..." value={password} onChangeText={setPassword} secureTextEntry />
            
            <Button title="Login" onPress={handleLogin} />

            <Button title="Login with Biometric" onPress={handleBiometric} />
        </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        paddingHorizontal:20,
        backgroundColor:"#f5f5f5"
    },

    title:{
        fontSize:30,
        fontWeight:"bold",
        color:"#333",
        marginBottom:30
    },

    input:{
        width:"100%",
        height:50,
        borderWidth:1,
        borderColor:"#ccc",
        borderRadius:10,
        paddingHorizontal:15,
        marginBottom:15,
        backgroundColor:"#fff",
        fontSize:16
    }
})