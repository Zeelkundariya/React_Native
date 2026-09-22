// import React from "react";
// import { View, Text, Button } from "react-native";
// import * as Network from "expo-network";

// export default function NetworkScreen() {

//   const getNetwork = async () => {
//     const network = await Network.getNetworkStateAsync();
//     const ip = await Network.getIpAddressAsync();

//     console.log("Network Type:", network.type);
//     console.log("Connected:", network.isConnected);
//     console.log("Internet:", network.isInternetReachable);
//     console.log("IP Address:", ip);
//   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Text>Network Demo</Text>

//       <Button
//         title="Get Network Info"
//         onPress={getNetwork}
//       />
//     </View>
//   );
// }


import React from "react";
import { View, Text, Button } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export default function LocalAuthScreen() {

  const authenticate = async () => {

    // 1. Check biometric hardware
    const hardware =
      await LocalAuthentication.hasHardwareAsync();

    console.log("Hardware:", hardware);

    if (!hardware) {
      console.log("No biometric hardware");
      return;
    }

    // 2. Check biometric is enrolled
    const enrolled =
      await LocalAuthentication.isEnrolledAsync();

    console.log("Enrolled:", enrolled);

    if (!enrolled) {
      console.log("No biometric enrolled");
      return;
    }

    // 3. Check authentication types
    const types =
      await LocalAuthentication.supportedAuthenticationTypesAsync();

    console.log("Authentication Types:", types);

    // 4. Check security level
    const level =
      await LocalAuthentication.getEnrolledLevelAsync();

    console.log("Security Level:", level);

    // 5. Authenticate
    const result =
      await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate",
      });

    console.log("Result:", result);

    if (result.success) {
      console.log("Authentication Successful");
    } else {
      console.log("Authentication Failed");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Local Authentication</Text>

      <Button
        title="Authenticate"
        onPress={authenticate}
      />
    </View>
  );
} 