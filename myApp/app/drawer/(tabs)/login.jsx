import {Alert, Pressable, StyleSheet, Text, TextInput, View} from 'react-native'
import React, {useState} from 'react'
import * as SecureStore from 'expo-secure-store'
import * as LocalAuthentication from 'expo-local-authentication'
import {router} from 'expo-router'

const Login = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {

        if(!name || !password){
            Alert.alert("Missing Details", "Please enter name and password")
            return
        }

        if(name === "Zeel" && password === "1234567"){

            await SecureStore.setItemAsync("token", "Bharat45")
            await SecureStore.setItemAsync("biometric", "true")

            setName("")
            setPassword("")

            router.replace("/home")
        }
        else{
            Alert.alert("Login Failed", "Invalid username or password")
        }

    }


    const handleBiometric = async () => {

        try{

            const token = await SecureStore.getItemAsync("token")
            const biometric = await SecureStore.getItemAsync("biometric")

            if(!token || biometric !== "true"){
                Alert.alert(
                    "Biometric Login Unavailable",
                    "Please login with username and password first"
                )
                return
            }

            const hasHardware = await LocalAuthentication.hasHardwareAsync()

            if(!hasHardware){
                Alert.alert(
                    "Not Supported",
                    "Biometric authentication is not supported on this device"
                )
                return
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync()

            if(!isEnrolled){
                Alert.alert(
                    "Biometric Not Setup",
                    "Please setup Face ID or fingerprint on your device"
                )
                return
            }

            const result = await LocalAuthentication.authenticateAsync({
                promptMessage:"Login with Biometric",
                cancelLabel:"Cancel",
                disableDeviceFallback:false
            })

            if(result.success){
                router.replace("/home")
            }
            else{
                Alert.alert(
                    "Authentication Failed",
                    "Biometric authentication was unsuccessful"
                )
            }

        }
        catch(error){
            console.log(error)

            Alert.alert(
                "Error",
                "Something went wrong during biometric authentication"
            )
        }

    }


    return(
        <View style={styles.container}>

            <View style={styles.card}>

                <Text style={styles.title}>Welcome Back</Text>

                <Text style={styles.subtitle}>
                    Login to continue
                </Text>

                <Text style={styles.label}>Username</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter name..."
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Password</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter password..."
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <Pressable
                    style={styles.loginButton}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>
                        Login
                    </Text>
                </Pressable>


                <View style={styles.dividerContainer}>

                    <View style={styles.divider}/>

                    <Text style={styles.dividerText}>OR</Text>

                    <View style={styles.divider}/>

                </View>


                <Pressable
                    style={styles.biometricButton}
                    onPress={handleBiometric}
                >
                    <Text style={styles.biometricButtonText}>
                        Login with Biometric
                    </Text>
                </Pressable>

            </View>

        </View>
    )
}

export default Login


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:22,
        backgroundColor:"#f4f6f8"
    },

    card:{
        backgroundColor:"#ffffff",
        padding:25,
        borderRadius:20,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:4
        },
        shadowOpacity:0.1,
        shadowRadius:10,
        elevation:5
    },

    title:{
        fontSize:30,
        fontWeight:"bold",
        color:"#222",
        textAlign:"center"
    },

    subtitle:{
        fontSize:15,
        color:"#777",
        textAlign:"center",
        marginTop:8,
        marginBottom:30
    },

    label:{
        fontSize:15,
        fontWeight:"600",
        color:"#333",
        marginBottom:8
    },

    input:{
        width:"100%",
        height:52,
        borderWidth:1,
        borderColor:"#d5d5d5",
        borderRadius:12,
        paddingHorizontal:15,
        marginBottom:18,
        backgroundColor:"#fafafa",
        fontSize:16,
        color:"#222"
    },

    loginButton:{
        height:52,
        backgroundColor:"#1677ff",
        borderRadius:12,
        justifyContent:"center",
        alignItems:"center",
        marginTop:5
    },

    loginButtonText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"bold"
    },

    dividerContainer:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:22
    },

    divider:{
        flex:1,
        height:1,
        backgroundColor:"#dddddd"
    },

    dividerText:{
        marginHorizontal:12,
        color:"#999",
        fontSize:13,
        fontWeight:"600"
    },

    biometricButton:{
        height:52,
        borderWidth:1.5,
        borderColor:"#1677ff",
        borderRadius:12,
        justifyContent:"center",
        alignItems:"center"
    },

    biometricButtonText:{
        color:"#1677ff",
        fontSize:16,
        fontWeight:"bold"
    }
})