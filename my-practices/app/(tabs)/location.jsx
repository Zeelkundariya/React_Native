// // import { View, Text, Button, StyleSheet, Alert } from "react-native";
// // import * as Location from "expo-location";
// // import { useState } from "react";

// // export default function LocationScreen() {

// //     const [permission, setPermission] = useState(false);
// //     const [location, setLocation] = useState(null);
// //     const [address, setAddress] = useState(null);


// //     const handlePermission = async () => {

// //         const result = await Location.requestForegroundPermissionsAsync();

// //         if (!result.granted) {
// //             Alert.alert("Error", "Location Permission Denied");
// //             return;
// //         }
// //         setPermission(true);
// //     }


// //     const handleCurrentLocation = async () => {

// //         const result = await Location.getCurrentPositionAsync();
// //         console.log(result);
// //         setLocation(result);
// //     }


// //     const handleGetAddress = async() =>{
// //         const permission = await location.requestForegroundPermissionsAsync();

// //         if(!permission.granted){
// //             Alert.alert("Error", "Location Permission Denied");
// //             return;
// //         }

// //         const currentLocation = await location.getCurrentPositionAsync();

// //         }

// //     }



// //     return (
// //         <View style={style.container}>
// //             <Text style={style.title}>   My Location Dashboard </Text>

// //             <Button title="Request Permission" onPress={handlePermission} />

// //             <View style={{ height: 20 }} />

// //             <Button title="Get Current Location" onPress={handleCurrentLocation} />


// //             {location && (
// //                 <View style={style.locationBox}>
// //                     <Text> latitude:{location.coords.latitude}</Text>
// //                     <Text> Longitude:{location.coords.longitude}</Text>
// //                     <Text>Accuracy:{location.coords.accuracy}</Text>
// //                     <Text>Altitude:{location.coords.altitude}</Text>
// //                     <Text>Heading:{location.coords.heading}</Text>
// //                     <Text>Speed:{location.coords.speed}</Text>
// //                     <Text>Timestamp:{new Date(location.timestamp).toLocaleString()}</Text>
// //                 </View>

// //             )}

// //         </View>
// //     )



// // const style = StyleSheet.create({

// //     container: {
// //         flex: 1,
// //         justifyContent: "center",
// //         padding: 20,
// //         backgroundColor: "#f5f5f5",
// //     },

// //     title: {
// //         fontSize: 24,
// //         fontWeight: "bold",
// //         textAlign: "center",
// //         marginBottom: 30,
// //     },

// //     locationBox: {
// //         backgroundColor: "white",
// //         padding: 20,
// //         borderRadius: 10,
// //         marginTop: 20,
// //     },

// //     text: {
// //         fontSize: 16,
// //         marginBottom: 8,
// //     },

// // })
// // import { View, Text, Button, StyleSheet, Alert } from "react-native";
// // import * as Location from "expo-location";
// // import { useState } from "react";

// // export default function LocationScreen() {

// //     const [permission, setPermission] = useState(false);
// //     const [location, setLocation] = useState(null);
// //     const [address, setAddress] = useState(null);


// //     const handlePermission = async () => {

// //         const result = await Location.requestForegroundPermissionsAsync();

// //         if (!result.granted) {
// //             Alert.alert("Error", "Location Permission Denied");
// //             return;
// //         }
// //         setPermission(true);
// //     }

// //     const handleCurrentLocation = async () => {
// //         const result = await Location.getCurrentPositionAsync();
// //         console.log(result);
// //         setLocation(result);
// //     }


// //     const handleGetAddress = async() =>{
// //         const permission = await location.requestForegroundPermissionsAsync();

// //         if(!permission.granted){
// //             Alert.alert("Error", "Location Permission Denied");
// //             return;
// //         }

// //         const currentLocation = await location.getCurrentPositionAsync();

// //         }

// //     }



// //     return (
// //         <View style={style.container}>
// //             <Text style={style.title}>   My Location Dashboard </Text>

// //             <Button title="Request Permission" onPress={handlePermission} />

// //             <View style={{ height: 20 }} />

// //             <Button title="Get Current Location" onPress={handleCurrentLocation} />


// //             {location && (
// //                 <View style={style.locationBox}>
// //                     <Text> latitude:{location.coords.latitude}</Text>
// //                     <Text> Longitude:{location.coords.longitude}</Text>
// //                     <Text>Accuracy:{location.coords.accuracy}</Text>
// //                     <Text>Altitude:{location.coords.altitude}</Text>
// //                     <Text>Heading:{location.coords.heading}</Text>
// //                     <Text>Speed:{location.coords.speed}</Text>
// //                     <Text>Timestamp:{new Date(location.timestamp).toLocaleString()}</Text>
// //                 </View>

// //             )}

// //         </View>
// //     )



// // const style = StyleSheet.create({

// //     container: {
// //         flex: 1,
// //         justifyContent: "center",
// //         padding: 20,
// //         backgroundColor: "#f5f5f5",
// //     },

// //     title: {
// //         fontSize: 24,
// //         fontWeight: "bold",
// //         textAlign: "center",
// //         marginBottom: 30,
// //     },

// //     locationBox: {
// //         backgroundColor: "white",
// //         padding: 20,
// //         borderRadius: 10,
// //         marginTop: 20,
// //     },

// //     text: {
// //         fontSize: 16,
// //         marginBottom: 8,
// //     },

// // })




// // import React, { useState } from "react";

// // import {
// //   View,
// //   Text,
// //   Button,
// //   StyleSheet,
// // } from "react-native";

// // import * as Location from "expo-location";


// // export default function App() {

// //   const [location, setLocation] = useState(null);


// //   const getLocation = async () => {

// //     // Ask permission
// //     const permission =
// //       await Location.requestForegroundPermissionsAsync();


// //     // Check permission
// //     if (!permission.granted) {

// //       alert("Location permission denied");

// //       return;
// //     }


// //     // Get current location
// //     const result =
// //       await Location.getCurrentPositionAsync({});


// //     // Save location
// //     setLocation(result);

// //   };


// //   return (

// //     <View style={styles.container}>

// //       <Text style={styles.title}>
// //         📍 My Location
// //       </Text>


// //       <Button
// //         title="Get My Location"
// //         onPress={getLocation}
// //       />


// //       {location && (

// //         <View>

// //           <Text>
// //             Latitude: {location.coords.latitude}
// //           </Text>

// //           <Text>
// //             Longitude: {location.coords.longitude}
// //           </Text>

// //         </View>

// //       )}

// //     </View>

// //   );
// // }


// // const styles = StyleSheet.create({

// //   container: {
// //     flex: 1,
// //     justifyContent: "center",
// //     alignItems: "center",
// //     gap: 20,
// //   },

// //   title: {
// //     fontSize: 25,
// //     fontWeight: "bold",
// //   },

// // }); 





import React, { useState, useRef } from "react";

import {
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";

import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";


export default function LocationScreen() {

  // Current location
  const [location, setLocation] = useState(null);

  // Last known location
  const [lastLocation, setLastLocation] = useState(null);

  // Address
  const [address, setAddress] = useState(null);

  // Tracker reference
  const watchRef = useRef(null);


  // =================================
  // GET PERMISSION
  // =================================

  const handleGetPermission = async () => {

    const permission =
      await Location.requestForegroundPermissionsAsync();

    if (!permission.granted) {

      alert("Permission denied");

      return;
    }

    alert("Permission granted");
  };


  // =================================
  // GET CURRENT LOCATION
  // =================================

  const handleGetCurrentLocation = async () => {

    const currentLocation =
      await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

    setLocation(currentLocation);
  };


  // =================================
  // GET LAST LOCATION
  // =================================

  const handleGetLastLocation = async () => {

    const last =
      await Location.getLastKnownPositionAsync();

    if (!last) {

      alert("Last location not available");

      return;
    }

    setLastLocation(last);
  };


  // =================================
  // GET ADDRESS
  // =================================

  const handleGetCurrentAddress = async () => {

    if (!location) {

      alert("Get current location first");

      return;
    }


    const result =
      await Location.reverseGeocodeAsync({

        latitude: location.coords.latitude,

        longitude: location.coords.longitude,

      });


    if (result.length > 0) {

      setAddress(result[0]);

    }

  };


  // =================================
  // START TRACKING
  // =================================

  const handleStartTracker = async () => {

    const permission =
      await Location.requestForegroundPermissionsAsync();


    if (!permission.granted) {

      alert("Permission denied");

      return;
    }


    watchRef.current =
      await Location.watchPositionAsync(

        {
          accuracy: Location.Accuracy.High,
        },

        (newLocation) => {

          console.log(newLocation);

          setLocation(newLocation);

        }

      );

  };


  // =================================
  // STOP TRACKING
  // =================================

  const handleStopTracker = () => {

    if (watchRef.current) {

      watchRef.current.remove();

      watchRef.current = null;

    }

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📍 Location App
      </Text>


      {/* Permission */}

      <Button
        title="Get Permission"
        onPress={handleGetPermission}
      />


      {/* Current Location */}

      <Button
        title="Get Current Location"
        onPress={handleGetCurrentLocation}
      />


      {location && (

        <View>

          <Text>
            Latitude: {location.coords.latitude}
          </Text>

          <Text>
            Longitude: {location.coords.longitude}
          </Text>

          <Text>
            Accuracy: {location.coords.accuracy}
          </Text>

          <Text>
            Altitude: {location.coords.altitude}
          </Text>

          <Text>
            Speed: {location.coords.speed}
          </Text>

          <Text>
            Heading: {location.coords.heading}
          </Text>

        </View>

      )}


      {/* Last Location */}

      <Button
        title="Get Last Location"
        onPress={handleGetLastLocation}
      />


      {lastLocation && (

        <View>

          <Text>
            Last Latitude:
            {lastLocation.coords.latitude}
          </Text>

          <Text>
            Last Longitude:
            {lastLocation.coords.longitude}
          </Text>

          <Text>
            Last Accuracy:
            {lastLocation.coords.accuracy}
          </Text>

        </View>

      )}


      {/* Address */}

      <Button
        title="Get Current Address"
        onPress={handleGetCurrentAddress}
      />


      {address && (

        <View>

          <Text>
            Name: {address.name}
          </Text>

          <Text>
            Street: {address.street}
          </Text>

          <Text>
            City: {address.city}
          </Text>

          <Text>
            District: {address.district}
          </Text>

          <Text>
            State: {address.region}
          </Text>

          <Text>
            Country: {address.country}
          </Text>

          <Text>
            Postal Code: {address.postalCode}
          </Text>

        </View>

      )}


      {/* Tracking */}

      <Button
        title="Start Tracker"
        onPress={handleStartTracker}
      />


      <Button
        title="Stop Tracker"
        onPress={handleStopTracker}
      />


      {/* MAP */}

      {location && (

        <MapView

          style={styles.map}

          initialRegion={{

            latitude:
              location.coords.latitude,

            longitude:
              location.coords.longitude,

            latitudeDelta: 0.01,

            longitudeDelta: 0.01,

          }}

        >

          <Marker

            coordinate={{

              latitude:
                location.coords.latitude,

              longitude:
                location.coords.longitude,

            }}

            title="Current Location"

            description="You are here"

          />

        </MapView>

      )}

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    gap: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  map: {
    width: "100%",
    height: 300,
    marginTop: 10,
  },

});