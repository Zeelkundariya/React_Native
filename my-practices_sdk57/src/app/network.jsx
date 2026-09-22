// import {Button, View, StyleSheet} from "react-native";
// import * as Network from "expo-network";

// export default function NetworkScreen(){
//     const handleGetNetwork = async()=>{
//         const res = await Network.getNetworkStateAsync();
//         console.log(res)
//     }
//     return(
//         <View style={style.container}>
//             <Button title=" Get Network " onPress={handleGetNetwork}/>
//         </View>
//     )
// }

// const style = StyleSheet.create({
// container:{
//     flex:1,
//     justifyContent:"center",
//     alignItems:"center",
//     backgroundColor:"grey",
// }
// })

// import { View, Text } from "react-native";
// import * as Network from "expo-network";

// export default function App() {
//   const state = Network.useNetworkState();

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "teal",
//       }}
//     >
//       <Text>Type: {state.type}</Text>

//       <Text>Connected: {String(state.isConnected)}</Text>

//       <Text>
//         Internet Reachable: {String(state.isInternetReachable)}
//       </Text>
//     </View>
//   );
// }


// import { View, Text } from "react-native";
// import * as Network from "expo-network";
// import { useEffect, useState } from "react";

// export default function App() {
//   const state = Network.useNetworkState();
//   const [ipAddress, setIpAddress] = useState("");

//   useEffect(() => {
//     const getIP = async () => {
//       const ip = await Network.getIpAddressAsync();
//       setIpAddress(ip);
//     };

//     getIP();
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "grey",
//       }}
//     >
//       <Text>Type: {state.type}</Text>

//       <Text>Connected: {String(state.isConnected)}</Text>

//       <Text>
//         Internet Reachable: {String(state.isInternetReachable)}
//       </Text>

//       <Text>IP Address: {ipAddress}</Text>
//     </View>
//   );
// }


// import { View, Text, Button } from "react-native";
// import * as Network from "expo-network";



// export default function NetWorkScreen() {
//     const networkState = Network.useNetworkState();

//     const handleGetNetwork = async () => {
//         try {
//             const result = await Network.getNetworkStateAsync();
//             const ip = await Network.getIpAddressAsync();
//             const airplaneMode = await Network.isAirplaneModeEnabledAsync();

//             console.log("Network State:", result);
//             console.log("IP Address:", ip);
//             console.log("Airplane Mode:", airplaneMode);
//         } catch (error) {
//             console.log("Network Error:", error);
//         }
//     };
 
//     const getIPInfo = async () => {
//         try {
//             const response = await fetch("https://ipinfo.io/json");

//             if (!response.ok) {
//                 throw new Error(`HTTP Error: ${response.status}`);
//             }

//             const data = await response.json();

//             console.log("IP:", data.ip);
//             console.log("City:", data.city);
//             console.log("Region:", data.region);
//             console.log("Country:", data.country);
//             console.log("Organization:", data.org);
//             console.log("Location:", data.loc);

//         } catch (error) {
//             console.log("IP Error:", error);
//         }
//     };

//     return (
//         <View
//             style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center",
//                 backgroundColor: "#fff7f7",
//             }}
//         >
//             <Text>Network Demo Class</Text>

//             <Button title="Get Network" onPress={handleGetNetwork} />

//             <Button
//                 title="Get IP Info"
//                 onPress={getIPInfo}
//             />

//             <Text>
//                 Type: {networkState.type}
//             </Text>

//             <Text>
//                 Connected: {String(networkState.isConnected)}
//             </Text>

//             <Text>
//                 Internet Reachable:{" "}
//                 {String(networkState.isInternetReachable)}
//             </Text>

//         </View>
//     );
// }



import React from "react";
import { View, Text, Button, Alert } from "react-native";
import * as Network from "expo-network";

export default function NetworkScreen() {
  const networkState = Network.useNetworkState();

  const getNetworkInfo = async () => {
    try {
      // Network state
      const state = await Network.getNetworkStateAsync();

      // IP address
      const ip = await Network.getIpAddressAsync();

      // Airplane mode
      const airplaneMode = await Network.isAirplaneModeEnabledAsync();

      console.log("Network State:", state);
      console.log("IP Address:", ip);
      console.log("Airplane Mode:", airplaneMode);

      Alert.alert(
        "Network Information",
        `Type: ${state.type}
Connected: ${state.isConnected}
Internet: ${state.isInternetReachable}
IP: ${ip}
Airplane Mode: ${airplaneMode}`
      );
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff7f7",
        gap: 10,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Network Demo
      </Text>

      <Text>Type: {networkState.type}</Text>

      <Text>
        Connected: {String(networkState.isConnected)}
      </Text>

      <Text>
        Internet Reachable:{" "}
        {String(networkState.isInternetReachable)}
      </Text>

      <Button
        title="Get Network Info"
        onPress={getNetworkInfo}
      />
    </View>
  );
}