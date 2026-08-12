// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as Location from "expo-location";
// import { useState } from "react";

// export default function LocationScreen() {

//     const [permission, setPermission] = useState(false);
//     const [location, setLocation] = useState(null);
//     const [address, setAddress] = useState(null);


//     const handlePermission = async () => {

//         const result = await Location.requestForegroundPermissionsAsync();

//         if (!result.granted) {
//             Alert.alert("Error", "Location Permission Denied");
//             return;
//         }
//         setPermission(true);
//     }


//     const handleCurrentLocation = async () => {

//         const result = await Location.getCurrentPositionAsync();
//         console.log(result);
//         setLocation(result);
//     }


//     const handleGetAddress = async() =>{
//         const permission = await location.requestForegroundPermissionsAsync();

//         if(!permission.granted){
//             Alert.alert("Error", "Location Permission Denied");
//             return;
//         }

//         const currentLocation = await location.getCurrentPositionAsync();

//         }

//     }



//     return (
//         <View style={style.container}>
//             <Text style={style.title}>   My Location Dashboard </Text>

//             <Button title="Request Permission" onPress={handlePermission} />

//             <View style={{ height: 20 }} />

//             <Button title="Get Current Location" onPress={handleCurrentLocation} />


//             {location && (
//                 <View style={style.locationBox}>
//                     <Text> latitude:{location.coords.latitude}</Text>
//                     <Text> Longitude:{location.coords.longitude}</Text>
//                     <Text>Accuracy:{location.coords.accuracy}</Text>
//                     <Text>Altitude:{location.coords.altitude}</Text>
//                     <Text>Heading:{location.coords.heading}</Text>
//                     <Text>Speed:{location.coords.speed}</Text>
//                     <Text>Timestamp:{new Date(location.timestamp).toLocaleString()}</Text>
//                 </View>

//             )}

//         </View>
//     )



// const style = StyleSheet.create({

//     container: {
//         flex: 1,
//         justifyContent: "center",
//         padding: 20,
//         backgroundColor: "#f5f5f5",
//     },

//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 30,
//     },

//     locationBox: {
//         backgroundColor: "white",
//         padding: 20,
//         borderRadius: 10,
//         marginTop: 20,
//     },

//     text: {
//         fontSize: 16,
//         marginBottom: 8,
//     },

// })
import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import * as Location from "expo-location";
// import { useState } from "react";

// export default function LocationScreen() {

//     const [permission, setPermission] = useState(false);
//     const [location, setLocation] = useState(null);
//     const [address, setAddress] = useState(null);


//     const handlePermission = async () => {

//         const result = await Location.requestForegroundPermissionsAsync();

//         if (!result.granted) {
//             Alert.alert("Error", "Location Permission Denied");
//             return;
//         }
//         setPermission(true);
//     }

//     const handleCurrentLocation = async () => {
//         const result = await Location.getCurrentPositionAsync();
//         console.log(result);
//         setLocation(result);
//     }


//     const handleGetAddress = async() =>{
//         const permission = await location.requestForegroundPermissionsAsync();

//         if(!permission.granted){
//             Alert.alert("Error", "Location Permission Denied");
//             return;
//         }

//         const currentLocation = await location.getCurrentPositionAsync();

//         }

//     }



//     return (
//         <View style={style.container}>
//             <Text style={style.title}>   My Location Dashboard </Text>

//             <Button title="Request Permission" onPress={handlePermission} />

//             <View style={{ height: 20 }} />

//             <Button title="Get Current Location" onPress={handleCurrentLocation} />


//             {location && (
//                 <View style={style.locationBox}>
//                     <Text> latitude:{location.coords.latitude}</Text>
//                     <Text> Longitude:{location.coords.longitude}</Text>
//                     <Text>Accuracy:{location.coords.accuracy}</Text>
//                     <Text>Altitude:{location.coords.altitude}</Text>
//                     <Text>Heading:{location.coords.heading}</Text>
//                     <Text>Speed:{location.coords.speed}</Text>
//                     <Text>Timestamp:{new Date(location.timestamp).toLocaleString()}</Text>
//                 </View>

//             )}

//         </View>
//     )



// const style = StyleSheet.create({

//     container: {
//         flex: 1,
//         justifyContent: "center",
//         padding: 20,
//         backgroundColor: "#f5f5f5",
//     },

//     title: {
//         fontSize: 24,
//         fontWeight: "bold",
//         textAlign: "center",
//         marginBottom: 30,
//     },

//     locationBox: {
//         backgroundColor: "white",
//         padding: 20,
//         borderRadius: 10,
//         marginTop: 20,
//     },

//     text: {
//         fontSize: 16,
//         marginBottom: 8,
//     },

// })
