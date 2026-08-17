import React, { useState } from "react";

import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  Alert,
  StyleSheet,
} from "react-native";

import * as Contacts from "expo-contacts";

export default function ContactScreen() {
  const [contacts, setContacts] = useState([]);

  // Get Contacts
  const getContacts = async () => {
    const permission =
      await Contacts.requestPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Denied",
        "Please allow contact permission."
      );

      return;
    }

    const { data } =
      await Contacts.getContactsAsync();

    console.log(data[0]);

    setContacts(data);
  };

  // Display Contact
  const renderContact = ({ item }) => {
    const phone =
      item.phoneNumbers?.[0]?.number ||
      "No Number";

    return (
      <View style={styles.contact}>

        {/* Image */}

        {item.image?.uri ? (
          <Image
            source={{ uri: item.image.uri }}
            style={styles.image}
          />
        ) : (
          <View style={styles.noImage}>
            <Text style={styles.initial}>
              {item.name?.[0] || "?"}
            </Text>
          </View>
        )}

        {/* Name */}

        <Text style={styles.name}>
          {item.name || "Unknown"}
        </Text>

        {/* Phone */}

        <Text style={styles.phone}>
          {phone}
        </Text>

      </View>
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Contacts
      </Text>

      <Button
        title="Get Contacts"
        onPress={getContacts}
      />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={renderContact}
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

  contact: {
    backgroundColor: "grey",
    padding: 15,
    marginTop: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },

  noImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  initial: {
    fontSize: 25,
    fontWeight: "bold",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },

  phone: {
    fontSize: 15,
  },

});