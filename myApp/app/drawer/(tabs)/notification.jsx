import {StyleSheet, Text, TextInput, View, TouchableOpacity} from "react-native"
import React, {useEffect, useState} from "react"
import * as Notifications from "expo-notifications"

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

const Notification = ()=> {
    const [title, setTitle] = useState("");
    const [second, setSecond] = useState("");
    const [notification, setNotification] = useState([])

    const getPermission = async ()=>{
        const {status} = await Notifications.requestPermissionsAsync()

        if(status !== "granted"){
            alert("Permission denied")
        }
    }

    const handleScheduleNotification = async ()=> {
        if(!title || !second){
            alert("Please add title and seconds")
            return
        }

        await Notifications.scheduleNotificationAsync({
            content:{
                title:"Reminder",
                body:title,
                data:{
                    message:title
                }
            },
            trigger:{
                type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                seconds:Number(second)
            }
        })

        setNotification([...notification, title])
        alert("Notification Scheduled")
        setTitle("")
        setSecond("")
    }

    const handleClearAll = async ()=>{
        await Notifications.cancelAllScheduledNotificationsAsync()
        setNotification([])
        alert("All Notifications Cleared")
    }
    useEffect(()=>{

        getPermission()
    },[])

    return(
        <View style={styles.container}>

            <View style={styles.card}>

                <Text style={styles.heading}>Notification Demo</Text>

                <Text style={styles.subHeading}>
                    Schedule your notification
                </Text>

                <Text style={styles.label}>Notification Title</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter title"
                    placeholderTextColor="#999"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Time in Seconds</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter seconds"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={second}
                    onChangeText={setSecond}
                />

                <TouchableOpacity
                    style={styles.scheduleButton}
                    onPress={handleScheduleNotification}
                >
                    <Text style={styles.buttonText}>
                        Schedule Notification
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.clearButton}
                    onPress={handleClearAll}
                >
                    <Text style={styles.clearButtonText}>
                        Clear Notifications
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default Notification

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

    heading:{
        fontSize:28,
        fontWeight:"bold",
        color:"#222",
        textAlign:"center"
    },

    subHeading:{
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
        height:52,
        borderWidth:1,
        borderColor:"#d5d5d5",
        borderRadius:12,
        paddingHorizontal:15,
        backgroundColor:"#fafafa",
        fontSize:16,
        color:"#222",
        marginBottom:20
    },

    scheduleButton:{
        height:52,
        backgroundColor:"#1677ff",
        borderRadius:12,
        justifyContent:"center",
        alignItems:"center",
        marginTop:5
    },

    buttonText:{
        color:"#ffffff",
        fontSize:16,
        fontWeight:"bold"
    },

    clearButton:{
        height:52,
        borderWidth:1.5,
        borderColor:"#e53935",
        borderRadius:12,
        justifyContent:"center",
        alignItems:"center",
        marginTop:15
    },

    clearButtonText:{
        color:"#e53935",
        fontSize:16,
        fontWeight:"bold"
    }
})