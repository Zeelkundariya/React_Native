// import { View, Text, Button, StyleSheet, Notification } from "react-native";
// import * as Notifications from "expo-notifications";

// Notification.setNotificationHandler({
//     handleNotification: async()=> ({
//         shouldShowBanner:true,
//         shouldShowList: true,
//         shouldPlaySound:true,
//         shouldSetBadge:true,
//     }),
// })

// export default function NotificationScreen() {
//     const handleNotification = async () => {
//         const permission = await Notifications.requestPermissionsAsync();

//         if (!permission.granted) {
//             return;
//         }

//         await Notifications.scheduleNotificationAsync({
//             content:{
//                 title:"Zeel",
//                 body:"Kundariya"
//             },
//             trigger:null,
//         })
//     }
//     return (
//         <View style={styles.container}>
//             <Text>Notification</Text>
//             <Button title="Get Notification" onPress={handleNotification} />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "grey"
//     }
// })







// import { StyleSheet, Text, View, Button } from "react-native";
// import React from "react";
// import * as Notifications from "expo-notifications";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowBanner: true,
//     shouldShowList: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// const Notification = () => {
//   const handleNotification = async () => {
//     const permission = await Notifications.requestPermissionsAsync({
//       ios: {
//         allowSound: true,
//         allowAlert: true,
//         allowBadge: true,
//       },
//     });

//     console.log(permission);

//     if (!permission.granted) {
//       console.log("Notification permission denied");
//       return;
//     }

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Zeel",
//         body: "Test notification",
//         sound: "default",
//       },
//       trigger: null,
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Notification</Text>

//       <Button
//         title="Get notification"
//         onPress={handleNotification}
//       />
//     </View>
//   );
// };

// export default Notification;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "grey",
//   },
// });





import { Button, StyleSheet, Text, View } from 'react-native'
import * as Notification from 'expo-notifications'
import React from 'react'

Notification.setNotificationHandler({
    handleNotification: async () =>(
        {
            shouldShowBanner: true,
            shouldShowList:true,
            shouldPlaySound: true,
            shouldSetBadge:true,
        }
    )
})

const NotificationFeature = () => {

    const handleNotifications = async () =>{
        const permission = await Notification.requestPermissionsAsync();
        if(!permission.granted) return;
        await Notification.scheduleNotificationAsync({
            content:{
                title:"Zeel",
                body:"Kundariya"
            },
            trigger: {
                type: 'timeInterval',
                seconds: 10,
                repeats: false,
            },
        });
    }

  return (
    <View style={{flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"teal"}}>
      <Text>Notification Feature</Text>

      <Button title="Get Notifications" onPress={handleNotifications} />
    </View>
  )
}

export default NotificationFeature

const styles = StyleSheet.create({})