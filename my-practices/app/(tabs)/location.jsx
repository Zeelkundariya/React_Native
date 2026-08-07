// import { View, Button, StyleSheet, Alert } from "react-native";
// import * as Location from "expo-location";

// export default function LocationScreen() {

//     const handleLocationPermission = async () => {

//         const result = await Location.requestForegroundPermissionsAsync();

//         if (!result.granted) {
//             Alert.alert("Error", "Permission Denied");
//             return;
//         }
//         console.log(result);

//         const res = await Location.getCurrentPositionAsync({
//             accuracy: Location.Accuracy.Highest,
//         });

//         console.log(res);
//     }


//     return (
//         <View style={style.container}>

//             <Button
//                 title="Get current location"
//                 onPress={handleLocationPermission}
//             />

//         </View>
//     )
// }


// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#f5f5f5",
//         padding: 20,
//     },
// })






// import {View, StyleSheet,Button,Text, Alert} from "react-native";
// import * as Location from "expo-location"

// export default function LocationScreen(){

//     const handleLocationPermission=()=>{
//         const result = await Location.requestForegroundPermissionsAsync();

//         if(!result.granted){
//             Alert.alert("Errro","Permission Denied")
//         }
//         console.log(result)

//         const res = await Location.getCurrentPositionAsync({
//             Accuracy : Location.Accuracy.Highest,
//              });
//             console.log(res);
//     }
//     return(
//         <View>
//             <Button title="Get Current Permission" onPress={handleLocationPermission Next point is clear how is it create belongments partially data at first at last at last pointer previous PRPS pointer short new note or data that means pointer ten address that means point then subset previous and complete in such an automation pointer previous pointer next time the next one assignment last change suppose ten means head is four point that means eight seven that is nine of the pandemic none create that means data structure pointer sorry specific unnecessarily private argument insert argument password initialized per second revise pointer plus thirty at last for in between discover gas on the basis of the condition given}/>
//         </View>
//     )
// }





// import { View, Text, Button } from "react-native";
// import * as Location from "expo-location";
// import { useEffect, useRef, useState } from "react";

// export default function LocationScreen() {
//   const [location, setLocation] = useState(null);

//   const statRef = useRef(null);

//   const handleStartTracker = async () => {
//     const permission = await Location.requestForegroundPermissionsAsync();

//     if (!permission.granted) {
//       return;
//     }

//     statRef.current = await Location.watchPositionAsync({}, (resLocation) => {
//       console.log(resLocation);
//       setLocation(resLocation);
//     });
//   };

//   const handleStopTracker = () => {
//     if (statRef.current) {
//       statRef.current.remove();
//       statRef.current = null;
//     }
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "grey",
//       }}
//     >
//       <Text>Location Screen</Text>

//       <Button title="Start Tracker" onPress={handleStartTracker} />

//       <View style={{ height: 50 }} />

//       <Button title="Stop Tracker" onPress={handleStopTracker} />
//     </View>
//   );
// }













// import { View, Text, Button } from "react-native";
// import * as Location from "expo-location";
// import MapView, { Marker } from "react-native-maps";
// import { useState, useRef } from "react";


// export default function LocationScreen() {

//     const [location, setLocation] = useState(null);
//     const locationRef = useRef(null);


//     const handleStart = async () => {

//         const permission = await Location.requestForegroundPermissionsAsync();

//         if (!permission.granted) {
//             return;
//         }

//         locationRef.current = await Location.watchPositionAsync(
//             {},
//             (result) => {
//                 setLocation(result);
//             }
//         );
//     }


//     const handleStop = () => {

//         if (locationRef.current) {
//             locationRef.current.remove();
//             locationRef.current = null;
//         }

//     }


//     return (
//         <View style={{
//             flex: 1,
//             alignItems: "center",
//             paddingTop: 50
//         }}>

//             <Text style={{ fontSize: 22 }}>
//                 Location Tracker
//             </Text>


//             <Button
//                 title="Start"
//                 onPress={handleStart}
//             />


//             <Button
//                 title="Stop"
//                 onPress={handleStop}
//             />


//             {location && (

//                 <View style={{ width: "100%", alignItems: "center" }}>

//                     <Text>
//                         Latitude: {location.coords.latitude}
//                     </Text>

//                     <Text>
//                         Longitude: {location.coords.longitude}
//                     </Text>


//                     <MapView
//                         style={{
//                             width: "90%",
//                             height: 350
//                         }}

//                         region={{
//                             latitude: location.coords.latitude,
//                             longitude: location.coords.longitude,
//                             latitudeDelta: 0.01,
//                             longitudeDelta: 0.01
//                         }}
//                     >

//                         <Marker
//                             coordinate={{
//                                 latitude: location.coords.latitude,
//                                 longitude: location.coords.longitude
//                             }}
//                         />

//                     </MapView>

//                 </View>

//             )}

//         </View>
//     )
// }






import { View, Button, Text, StyleSheet } from "react-native";
import * as Location from "expo-location"
import {useRef, useState} from "react"

export default function LocationScreen(){
    const [location, setLocation]= useState(null);
    const statRef = useRef(null)

    const handleStartTracker = async() => {
        const permission = await Location.requestForegroundPermissionsAsync();

        if(!permission.granted){
            return;
        }

        statRef.current = await Location.watchPositionAsync({timeInterval:5000},
            (reslocation)=>{
                console.log(reslocation)
                setLocation(reslocation)
            }
        );
    }

    const handleStopTracker = ()=>{
        if(statRef.current){
            statRef.current.remove();
            statRef.current = null;
        }
    }
    return (
        <View style={style.container}>
            <Button title="Start Tracker" onPress={handleStartTracker}/>

            <Button title="Stop Tracker" onPress={handleStopTracker}/>


            {location && (
                <View style={{width:"100%", alignItems:"center"}}>
                    <Text>Latitude:{location.coords.latitude}</Text>
                    <Text>Longitude:{location.coords.longitude}</Text>
                    <Text>Time: {new Date(location.timestamp).toLocaleString()}</Text>
                </View>
            )}
        </View>
    )
}


const style = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"grey",
        justifyContent:"center"
    }
})



import { View, Text, Button, StyleSheet } from "react-native";
import * as Location from "expo-location";
import { useState } from "react";

export default function LocationScreen() {

    const [address, setAddress] = useState(null);

    const handleGetAddress = async () => {

        const permission =
            await Location.requestForegroundPermissionsAsync();

        if (!permission.granted) {
            ALert.alert("permission denied");
            return;
        }

        const currentLocation =
            await Location.getCurrentPositionAsync();

        const getAddress =
            await Location.reverseGeocodeAsync({
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });

        setAddress(getAddress);
    };

    const fullAddress = address
        ? `${address[0].name}, ${address[0].street}, ${address[0].city}, ${address[0].region}, ${address[0].country} - ${address[0].postalCode}`
        : "";

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "grey",
            }}
        >
            <Text>React Native Expo Location Class</Text>

            <Button
                title="Get Address"
                onPress={handleGetAddress}
            />

            {address && (
                <Text>{fullAddress}</Text>
            )}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "teal",
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },

    addressBox: {
        marginTop: 20,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "90%",
    },

    addressText: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
        color: "black",
    },
});