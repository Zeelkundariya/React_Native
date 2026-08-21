// import { useState } from "react";
// import {
//   View,
//   Button,
//   FlatList,
//   Image,
//   Text,
//   TextInput,
//   StyleSheet,
// } from "react-native";
// import * as Contacts from "expo-contacts";

// export default function ContactsScreen() {
//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState("");

//   const handlePermission = async () => {
//     const permission = await Contacts.requestPermissionsAsync();

//     if (!permission.granted) {
//       return;
//     }
//   };

//   const getContacts = async () => {
//     const contactData = await Contacts.getContactsAsync({
//       fields: [
//         Contacts.Fields.PhoneNumbers,
//         Contacts.Fields.Emails,
//         Contacts.Fields.Image,
//       ],
//       sort: Contacts.SortTypes.FirstName,
//     });

//     // console.log(contactData.data[0].phoneNumbers?.[0]?.number);

//     setContacts(contactData.data);
//   };

//   const searchedData = contacts.filter((item) => {
//     const name = item.name?.toLowerCase() || "";
//     const phone = item.phoneNumbers?.[0]?.number || "";

//     return (
//       name.includes(search.toLowerCase()) ||
//       phone.includes(search)
//     );
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Contacts</Text>

//       <View style={styles.buttons}>
//         <Button
//           title="Request Permission"
//           onPress={handlePermission}
//         />

//         <Button
//           title="Get Contacts"
//           onPress={getContacts}
//         />
//       </View>

//       <TextInput
//         placeholder="Search Contacts..."
//         value={search}
//         onChangeText={setSearch}
//         style={styles.search}
//       />

//       <FlatList
//         data={searchedData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.contactCard}>
//             {item.imageAvailable && item.image?.uri ? (
//               <Image
//                 source={{ uri: item.image.uri }}
//                 style={styles.image}
//               />
//             ) : (
//               <Text style={styles.noImage}>No Image</Text>
//             )}

//             <Text style={styles.name}>
//               Name: {item.name}
//             </Text>

//             <Text style={styles.info}>
//               Phone Number:{" "}
//               {item.phoneNumbers?.[0]?.number || "No Phone"}
//             </Text>

//             <Text style={styles.info}>
//               Email:{" "}
//               {item.emails?.[0]?.email || "No Email"}
//             </Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   buttons: {
//     gap: 10,
//     marginBottom: 20,
//   },

//   search: {
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },

//   contactCard: {
//     backgroundColor: "white",
//     padding: 15,
//     marginBottom: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },

//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },

//   noImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#ddd",
//     textAlign: "center",
//     paddingTop: 30,
//     marginBottom: 10,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },

//   info: {
//     fontSize: 15,
//     marginBottom: 5,
//   },
// });

// import React, { useState } from "react";

// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   Image,
//   Alert,
//   TextInput,
//   StyleSheet,
// } from "react-native";

// import * as Contacts from "expo-contacts";

// export default function ContactScreen() {
//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState("");

//   // =========================
//   // Get Contacts
//   // =========================
//   const getContacts = async () => {
//     const permission =
//       await Contacts.requestPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert(
//         "Permission Denied",
//         "Contact permission is required."
//       );

//       return;
//     }

//     const { data } = await Contacts.getContactsAsync({
//       fields: [
//         Contacts.Fields.PhoneNumbers,
//         Contacts.Fields.Image,
//       ],
//     });

//     setContacts(data);
//   };

//   const handleDeleteContact = (contact) => {
//     Alert.alert(
//       "Delete Contact",
//       `Are you sure you want to delete ${
//         contact.name || "this contact"
//       }?`,
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },

//         {
//           text: "Delete",
//           style: "destructive",

//           onPress: async () => {
//             try {
//               await Contacts.removeContactAsync(
//                 contact.id
//               );

//               setContacts((previousContacts) =>
//                 previousContacts.filter(
//                   (item) => item.id !== contact.id
//                 )
//               );

//               Alert.alert(
//                 "Success",
//                 "Contact deleted successfully"
//               );
//             } catch (error) {
//               console.log("DELETE ERROR:", error);

//               Alert.alert(
//                 "Error",
//                 "Unable to delete contact"
//               );
//             }
//           },
//         },
//       ]
//     );
//   };

//   const filteredContacts = contacts.filter((contact) =>
//     contact.name
//       ?.toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   const renderContact = ({ item }) => {
//     const phone =
//       item.phoneNumbers?.[0]?.number ||
//       "No Phone Number";

//     const email =
//       item.emails?.[0]?.email ||
//       "No Email";

//     return (
//       <View style={styles.contactCard}>

//         {item.imageAvailable && item.image?.uri ? (
//           <Image
//             source={{ uri: item.image.uri }}
//             style={styles.image}
//           />
//         ) : (
//           <Text style={styles.noImage}>
//             No Image
//           </Text>
//         )}

//         <Text style={styles.name}>
//           {item.name || "Unknown Name"}
//         </Text>

//         <Text style={styles.info}>
//          {phone}
//         </Text>

//         <Text style={styles.info}>
//           {email}
//         </Text>

//         <Button
//           title="Delete"
//           color="red"
//           onPress={() =>
//             handleDeleteContact(item)
//           }
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>

//       <Text style={styles.title}>
//         My Contacts
//       </Text>

//       <View style={styles.buttons}>
//         <Button
//           title="Get Contacts"
//           onPress={getContacts}
//         />
//       </View>

//       <TextInput
//         style={styles.search}
//         placeholder="Search contacts..."
//         value={search}
//         onChangeText={setSearch}
//       />

//       <FlatList
//         data={filteredContacts}
//         keyExtractor={(item) => item.id}
//         renderItem={renderContact}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   buttons: {
//     gap: 10,
//     marginBottom: 20,
//   },

//   search: {
//     backgroundColor: "white",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },

//   contactCard: {
//     backgroundColor: "white",
//     padding: 15,
//     marginBottom: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },

//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },

//   noImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#ddd",
//     textAlign: "center",
//     paddingTop: 30,
//     marginBottom: 10,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },

//   info: {
//     fontSize: 15,
//     marginBottom: 5,
//   },

// });


// import React, { useState } from "react";

// import {
//   View,
//   Text,
//   Button,
//   FlatList,
//   Image,
//   Alert,
//   TextInput,
//   StyleSheet,
// } from "react-native";

// import * as Contacts from "expo-contacts";

// export default function ContactScreen() {

//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState("");

//   // Get Contacts
//   const getContacts = async () => {
//     const permission = await Contacts.requestPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert(
//         "Permission Denied",
//         "Please allow contact permission."
//       );
//       return;
//     }

//     const { data } = await Contacts.getContactsAsync({
//         fields: [
//           Contacts.Fields.PhoneNumbers,
//           Contacts.Fields.Image,
//         ],
//       });

//     setContacts(data);
//   };


//   // Add Contact
//   const addContact = async () => {
//     const permission =  await Contacts.requestPermissionsAsync();
//     if (!permission.granted) {
//       Alert.alert(
//         "Permission Denied",
//         "Please allow contact permission."
//       );
//       return;
//     }

//     const contact = {
//       [Contacts.Fields.FirstName]: "New",
//       [Contacts.Fields.LastName]: "Contact",

//       [Contacts.Fields.PhoneNumbers]: [
//         {
//           label: "mobile",
//           number: "9999999999",
//         },
//       ],
//     };

//     await Contacts.addContactAsync(contact);

//     Alert.alert(
//       "Success",  "Contact added successfully!"
//     );

//     getContacts();
//   };


//   // Delete Contact
//   const deleteContact = (contact) => {
//     Alert.alert(
//       "Delete Contact",`Delete ${contact.name}?`,
//       [
//         {
//           text: "Cancel",
//         },
//         {
//           text: "Delete",
//           style: "destructive",

//           onPress: async () => {
//              await Contacts.removeContactAsync(contact.id);
//             setContacts(
//               contacts.filter(
//                 (item) => item.id !== contact.id
//               )
//             );
//           },
//         },
//       ]
//     );
//   };


//   // Search
//   const filteredContacts =
//     contacts.filter((contact) =>
//       contact.name
//         ?.toLowerCase()
//         .includes(search.toLowerCase())
//     );


//   // Contact Card
//   const renderContact = ({ item }) => {
//     const phone =
//       item.phoneNumbers?.[0]?.number ||
//       "No Number";

//     return (
//       <View style={styles.contact}>

//         {/* Image */}

//         {item.imageAvailable &&
//         item.image?.uri ? (
//           <Image
//             source={{
//               uri: item.image.uri,
//             }}
//             style={styles.image}
//           />

//         ) : (

//           <View style={styles.noImage}>
//             <Text>No Image</Text>
//           </View>

//         )}


//         {/* Name */}

//         <Text style={styles.name}>
//           {item.name || "Unknown"}
//         </Text>


//         {/* Phone */}

//         <Text style={styles.phone}>
//           {phone}
//         </Text>


//         {/* Delete */}

//         <Button
//           title="Delete"
//           color="red"
//           onPress={() =>
//             deleteContact(item)
//           }
//         />

//       </View>
//     );
//   };


//   return (
//     <View style={styles.container}>

//       {/* Title */}

//       <Text style={styles.title}>
//         My Contacts
//       </Text>


//       {/* Buttons */}

//       <View style={styles.buttons}>

//         <Button
//           title="Get Contacts"
//           onPress={getContacts}
//         />

//         <Button
//           title="Add Contact"
//           onPress={addContact}
//         />

//       </View>


//       {/* Search */}

//       <TextInput
//         style={styles.search}
//         placeholder="Search contact..."
//         value={search}
//         onChangeText={setSearch}
//       />


//       {/* Contact List */}

//       <FlatList
//         data={filteredContacts}
//         keyExtractor={(item) => item.id}
//         renderItem={renderContact}
//       />

//     </View>
//   );
// }


// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },

//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   buttons: {
//     gap: 10,
//     marginBottom: 20,
//   },

//   search: {
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "#ddd",
//     marginBottom: 15,
//   },

//   contact: {
//     backgroundColor: "white",
//     padding: 15,
//     marginBottom: 12,
//     borderRadius: 10,
//     alignItems: "center",
//   },

//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },

//   noImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     backgroundColor: "#ddd",
//     justifyContent: "center",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },

//   phone: {
//     fontSize: 15,
//     marginBottom: 10,
//   },

// });



import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import * as Contacts from "expo-contacts";


export default function ContactScreen() {

  const [contacts, setContacts] = useState([]);

  const [search, setSearch] = useState("");


  // Get Contacts
  const getContacts = async () => {

    const permission =
      await Contacts.requestPermissionsAsync();

    if (!permission.granted) {

      Alert.alert("Permission Denied");

      return;
    }


    const result =
      await Contacts.getContactsAsync({

        fields: [
          Contacts.Fields.PhoneNumbers,
        ],

      });


    setContacts(result.data);

  };


  // Add Contact
  const addContact = async () => {

    const permission =
      await Contacts.requestPermissionsAsync();

    if (!permission.granted) {

      Alert.alert("Permission Denied");

      return;
    }


    const contact = {

      [Contacts.Fields.FirstName]: "New",

      [Contacts.Fields.LastName]: "Contact",

      [Contacts.Fields.PhoneNumbers]: [
        {
          label: "mobile",
          number: "9999999999",
        },
      ],

    };


    await Contacts.addContactAsync(contact);

    Alert.alert("Contact Added");

    getContacts();

  };


  // Delete Contact
  const deleteContact = async (id) => {

    await Contacts.removeContactAsync(id);

    setContacts(
      contacts.filter(
        (contact) => contact.id !== id
      )
    );

  };


  // Search Contact
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        📱 My Contacts
      </Text>


      {/* Buttons */}

      <Button
        title="Get Contacts"
        onPress={getContacts}
      />

      <Button
        title="Add Contact"
        onPress={addContact}
      />


      {/* Search */}

      <TextInput
        style={styles.input}
        placeholder="Search contact..."
        value={search}
        onChangeText={setSearch}
      />


      {/* Contact List */}

      <FlatList

        data={filteredContacts}

        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (

          <View style={styles.contact}>

            <Text style={styles.name}>
              {item.name || "Unknown"}
            </Text>


            <Text>
              📞{" "}
              {item.phoneNumbers?.[0]?.number ||
                "No Number"}
            </Text>


            <Button
              title="Delete"
              onPress={() =>
                deleteContact(item.id)
              }
            />

          </View>

        )}

      />

    </View>

  );

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 15,
  },

  contact: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

});