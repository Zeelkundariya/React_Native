import { useState } from "react";
import { View, Button, Text, ScrollView } from "react-native";
import * as Contacts from "expo-contacts";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    const permission = await Contacts.requestPermissionsAsync();

    if (!permission.granted) {
      return;
    }
    const {data} = await Contacts.getContactsAsync();
    setContacts(data);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Button title="Load Contacts" onPress={loadContacts} />
      <ScrollView style={{ marginTop: 20 }}>

        {contacts.map((contact) => (
          <Text key={contact.id}>{contact.name}</Text>
        ))}

      </ScrollView>
    </View>
  );
}




