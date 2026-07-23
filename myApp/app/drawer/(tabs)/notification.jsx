import {StyleSheet, Text, TextInput, View} from "react-native"
import React, {useEffect, useState} from "react"
import * as Notifications from "expo-notifications"
import {Button} from "@react-navigation/elements";

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
                type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
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
            <Text style={styles.heading}>Notification Demo Class</Text>

            <TextInput 
                style={styles.input}
                placeholder="Enter title" 
                value={title} 
                onChangeText={setTitle}
            />

            <TextInput 
                style={styles.input}
                placeholder="Enter second" 
                keyboardType="numeric" 
                value={second} 
                onChangeText={setSecond}
            />

            <Button 
                title="Schedule Notification" 
                onPress={handleScheduleNotification}
            />

            <View style={{height:20}}/>

            <Button 
                title="Clear Notification" 
                onPress={handleClearAll}
            />
        </View>
    )
}

export default Notification

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:25,
        backgroundColor:"#f5f5f5"
    },

    heading:{
        fontSize:28,
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:30,
        color:"#333"
    },

    input:{
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