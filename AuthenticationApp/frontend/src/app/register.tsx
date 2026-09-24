import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    Alert
} from "react-native";

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {

        try {

            const response = await fetch(
                "http://YOUR_IP_ADDRESS:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            Alert.alert(data.message);

        } catch (error) {

            Alert.alert("Something went wrong");

        }
    };

    return (
        <View style={{ padding: 20 }}>

            <Text>Register</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={{
                    borderWidth: 1,
                    marginTop: 20,
                    padding: 10
                }}
            />

            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{
                    borderWidth: 1,
                    marginTop: 10,
                    padding: 10
                }}
            />

            <View style={{ marginTop: 20 }}>
                <Button
                    title="Register"
                    onPress={handleRegister}
                />
            </View>

        </View>
    );
}
