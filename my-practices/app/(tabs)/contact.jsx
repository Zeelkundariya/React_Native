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

import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";

import * as Contacts from "expo-contacts";

export default function ContactScreen() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  // =========================
  // Get Contacts
  // =========================
  const getContacts = async () => {
    const permission =
      await Contacts.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "Contact permission is required."
      );

      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Image,
      ],
    });

    setContacts(data);
  };

  const handleDeleteContact = (contact) => {
    Alert.alert(
      "Delete Contact",
      `Are you sure you want to delete ${
        contact.name || "this contact"
      }?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },

        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            try {
              await Contacts.removeContactAsync(
                contact.id
              );

              setContacts((previousContacts) =>
                previousContacts.filter(
                  (item) => item.id !== contact.id
                )
              );

              Alert.alert(
                "Success",
                "Contact deleted successfully"
              );
            } catch (error) {
              console.log("DELETE ERROR:", error);

              Alert.alert(
                "Error",
                "Unable to delete contact"
              );
            }
          },
        },
      ]
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const renderContact = ({ item }) => {
    const phone =
      item.phoneNumbers?.[0]?.number ||
      "No Phone Number";

    const email =
      item.emails?.[0]?.email ||
      "No Email";

    return (
      <View style={styles.contactCard}>

        {item.imageAvailable && item.image?.uri ? (
          <Image
            source={{ uri: item.image.uri }}
            style={styles.image}
          />
        ) : (
          <Text style={styles.noImage}>
            No Image
          </Text>
        )}

        <Text style={styles.name}>
          {item.name || "Unknown Name"}
        </Text>

        <Text style={styles.info}>
         {phone}
        </Text>

        <Text style={styles.info}>
          {email}
        </Text>

        <Button
          title="Delete"
          color="red"
          onPress={() =>
            handleDeleteContact(item)
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Contacts
      </Text>

      <View style={styles.buttons}>
        <Button
          title="Get Contacts"
          onPress={getContacts}
        />
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search contacts..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  buttons: {
    gap: 10,
    marginBottom: 20,
  },

  search: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  contactCard: {
    backgroundColor: "white",
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },

  noImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ddd",
    textAlign: "center",
    paddingTop: 30,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  info: {
    fontSize: 15,
    marginBottom: 5,
  },

});






// import { useState } from "react";
// import {
//   View,
//   Button,
//   FlatList,
//   Image,
//   Text,
//   TextInput,
//   StyleSheet,
//   Alert,
// } from "react-native";
// import * as Contacts from "expo-contacts";

// export default function ContactsScreen() {
//   const [contacts, setContacts] = useState([]);
//   const [search, setSearch] = useState("");

//   const [showAdd, setShowAdd] = useState(false);

//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");

//   const handlePermission = async () => {
//     const permission = await Contacts.requestPermissionsAsync();

//     if (!permission.granted) {
//       Alert.alert(
//         "Permission Required",
//         "Please allow Contacts permission."
//       );
//       return false;
//     }

//     return true;
//   };

//   const getContacts = async () => {
//     const permission = await handlePermission();

//     if (!permission) {
//       return;
//     }

//     const contactData = await Contacts.getContactsAsync({
//       fields: [
//         Contacts.Fields.PhoneNumbers,
//         Contacts.Fields.Emails,
//         Contacts.Fields.Image,
//       ],
//       sort: Contacts.SortTypes.FirstName,
//     });

//     setContacts(contactData.data);
//   };

//   const addContact = async () => {
//     if (!firstName && !lastName) {
//       Alert.alert("Error", "Please enter a name.");
//       return;
//     }

//     if (!phone) {
//       Alert.alert("Error", "Please enter a phone number.");
//       return;
//     }

//     const permission = await handlePermission();

//     if (!permission) {
//       return;
//     }

//     try {
//       const contact = {
//         firstName: firstName,
//         lastName: lastName,
//         phoneNumbers: [
//           {
//             label: "mobile",
//             number: phone,
//           },
//         ],
//         emails: email
//           ? [
//               {
//                 label: "home",
//                 email: email,
//               },
//             ]
//           : [],
//       };

//       await Contacts.addContactAsync(contact);

//       Alert.alert("Success", "Contact saved successfully.");

//       setFirstName("");
//       setLastName("");
//       setPhone("");
//       setEmail("");
//       setShowAdd(false);

//       getContacts();
//     } catch (error) {
//       console.log(error);
//       Alert.alert("Error", "Could not save contact.");
//     }
//   };

//   const searchedData = contacts.filter((item) => {
//     const name = item.name?.toLowerCase() || "";
//     const phoneNumber = item.phoneNumbers?.[0]?.number || "";

//     return (
//       name.includes(search.toLowerCase()) ||
//       phoneNumber.includes(search)
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

//         <Button
//           title="Add Contact"
//           onPress={() => setShowAdd(!showAdd)}
//         />
//       </View>

//       {showAdd && (
//         <View style={styles.addBox}>
//           <Text style={styles.addTitle}>Add New Contact</Text>

//           <TextInput
//             placeholder="First Name"
//             value={firstName}
//             onChangeText={setFirstName}
//             style={styles.input}
//           />

//           <TextInput
//             placeholder="Last Name"
//             value={lastName}
//             onChangeText={setLastName}
//             style={styles.input}
//           />

//           <TextInput
//             placeholder="Phone Number"
//             value={phone}
//             onChangeText={setPhone}
//             keyboardType="phone-pad"
//             style={styles.input}
//           />

//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             keyboardType="email-address"
//             style={styles.input}
//           />

//           <Button
//             title="Save Contact"
//             onPress={addContact}
//           />
//         </View>
//       )}

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
//               <Text style={styles.noImage}>
//                 No Image
//               </Text>
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

//   addBox: {
//     backgroundColor: "white",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//   },

//   addTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },

//   input: {
//     backgroundColor: "#f5f5f5",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 10,
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