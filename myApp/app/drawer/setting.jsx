// import React from 'react';
// import { View,Text, Button, Alert, StyleSheet, TouchableOpacity,} from 'react-native';

// const Setting = () => {
//   const handlePress = () => {
//     console.log("Pressed");
//     Alert.alert("Success", "Button Pressed");
//   };

//   return (
//     <View style={styles.container}>

//       <TouchableOpacity
//         style={styles.button}
//         onPress={() => console.log("Button Pressed")}
//         activeOpacity={0.3}
//       >
//         <Text style={styles.buttonText}>Button</Text>
//       </TouchableOpacity>

//       <Text style={styles.text}>React Native</Text>

//       <Button
//         title="Click Me"
//         onPress={() => Alert.alert("Clicked")}
//       />

//       <Button
//         title="Login"
//         onPress={handlePress}
//       />

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "grey",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   button: {
//     backgroundColor: "#3b82f6",
//     paddingVertical: 13,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     marginBottom: 20,
//   },

//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

// export default Setting;



// import {styleSheet, Text, TextInput, View} from "react-native"
// import React, {useState} from 'react'

// const setting = ()=> {
//   const [name, setName] = useState("") 
//   return (
//     <View>
//       <Text>
//         Write Something
//       </Text>

//       <TextInput placeholder="Enter Your Name" value={name} onChangeText={setName}/>

//       <Text>Name:{name}</Text>
//     </View>
//   )
// }


// export default setting


// const styles = StyleSheet.create({
//   container:{
//     flex:1,
//     justifyContent:"center",
//     alignItems:"center",
//     backgroungColor:"grey"
//   }
// })



// import React, { useReducer } from 'react';
// import { StyleSheet, Text, TextInput, View } from 'react-native';

// // Initial State
// const initialState = {
//   name: '',
//   email: '',
// };

// // Reducer Function
// function reducer(state, action) {
//   switch (action.type) {
//     case 'SET_NAME':
//       return {
//         ...state,
//         name: action.payload,
//       };

//     case 'SET_EMAIL':
//       return {
//         ...state,
//         email: action.payload,
//       };

//     case 'RESET':
//       return initialState;

//     default:
//       return state;
//   }
// }

// const Setting = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>User Information</Text>

//       <TextInput
//         placeholder="Enter your Name"
//         value={state.name}
//         onChangeText={(text) =>
//           dispatch({
//             type: 'SET_NAME',
//             payload: text,
//           })
//         }
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Enter your Email"
//         value={state.email}
//         onChangeText={(text) =>
//           dispatch({
//             type: 'SET_EMAIL',
//             payload: text,
//           })
//         }
//         keyboardType="email-address"
//         style={styles.input}
//       />

//       <View style={styles.card}>
//         <Text style={styles.text}> Name : {state.name}</Text>
//         <Text style={styles.text}> Email : {state.email}</Text>
//       </View>
//     </View>
//   );
// };

// export default Setting;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#9ec3e8',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },

//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 30,
//   },

//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#f2e3e3',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     backgroundColor: '#a69696',
//     marginBottom: 15,
//     fontSize: 16,
//   },

//   card: {
//     width: '100%',
//     backgroundColor: '#72a5e0',
//     padding: 20,
//     borderRadius: 12,
//     marginTop: 20,
//     elevation: 5,
//   },

//   text: {
//     color: '#e4d9d9',
//     fontSize: 18,
//     marginBottom: 10,
//   },
// });







// import React from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';

// const users = [
//   { id: '1', name: 'Rahul' },
//   { id: '2', name: 'Priya' },
//   { id: '3', name: 'Aman' },
//   { id: '4', name: 'Sneha' },
// ];

// const Setting = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Settings</Text>

//       <FlatList
//         data={users}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text style={styles.text}>
//               {item.id}. {item.name}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default Setting;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   card: {
//     padding: 15,
//     marginBottom: 10,
//     backgroundColor: '#e3f2fd',
//     borderRadius: 8,
//   },
//   text: {
//     fontSize: 18,
//   },
// });

import { View, Text } from "react-native";

export default function Setting() {
  return (
    <View>
      <Text>Setting Page</Text>
    </View>
  );
}