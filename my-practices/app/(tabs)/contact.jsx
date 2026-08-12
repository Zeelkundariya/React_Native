import { useState } from "react";
import {
  View,
  Button,
  FlatList,
  Image,
  Text,
  TextInput,
  StyleSheet,
} from "react-native";
import * as Contacts from "expo-contacts";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const handlePermission = async () => {
    const permission = await Contacts.requestPermissionsAsync();

    if (!permission.granted) {
      return;
    }
  };

  const getContacts = async () => {
    const contactData = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.PhoneNumbers,
        Contacts.Fields.Emails,
        Contacts.Fields.Image,
      ],
      sort: Contacts.SortTypes.FirstName,
    });

    console.log(contactData.data[0].phoneNumbers?.[0]?.number);

    setContacts(contactData.data);
  };

  const searchedData = contacts.filter((item) => {
    const name = item.name?.toLowerCase() || "";
    const phone = item.phoneNumbers?.[0]?.number || "";

    return (
      name.includes(search.toLowerCase()) ||
      phone.includes(search)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Contacts</Text>

      <View style={styles.buttons}>
        <Button
          title="Request Permission"
          onPress={handlePermission}
        />

        <Button
          title="Get Contacts"
          onPress={getContacts}
        />
      </View>

      <TextInput
        placeholder="Search Contacts..."
        value={search}
        onChangeText={setSearch}
        style={styles.search}
      />

      <FlatList
        data={searchedData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            {item.imageAvailable && item.image?.uri ? (
              <Image
                source={{ uri: item.image.uri }}
                style={styles.image}
              />
            ) : (
              <Text style={styles.noImage}>No Image</Text>
            )}

            <Text style={styles.name}>
              Name: {item.name}
            </Text>

            <Text style={styles.info}>
              Phone Number:{" "}
              {item.phoneNumbers?.[0]?.number || "No Phone"}
            </Text>

            <Text style={styles.info}>
              Email:{" "}
              {item.emails?.[0]?.email || "No Email"}
            </Text>
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