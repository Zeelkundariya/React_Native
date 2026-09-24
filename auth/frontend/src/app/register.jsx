import { View, Text, Pressable, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function RegisterUser() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null);

    const handleRegister = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/api/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        password: password,
                    }),
                }
            );

            const result = await response.json();

            console.log("Backend response:", result);

            setData(result);

            if (result.success) {
                router.replace("/");
            }
        } catch (error) {
            console.log("Registration error:", error);

            setData({
                success: false,
                msg: "Unable to connect to server",
            });
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
            {data && !data.success && (
                <Text>
                    Register Failed: {data.msg}
                </Text>
            )}

            <TextInput
                placeholder="Enter name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Pressable onPress={handleRegister}>
                <Text>Register as User</Text>
            </Pressable>
        </View>
    );
}