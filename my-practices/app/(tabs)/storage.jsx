import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [saveData, setSaveData] = useState("")
    const handleSaveData = async () => {
        try {
            const user = {
                userName: name,
                userEmail: email,
                userPassword: password,
            };

            await AsyncStorage.setItem("userData", JSON.stringify(user));
        } catch (error) {
            console.log(error)
        }
    }
    const handleGetData = async () => {
        try {
            const value = await AsyncStorage.getItem("userData");

            if (value !== null) {
                const user = JSON.parse(value);

                setName(user.userName);
                setEmail(user.userEmail);
                setPassword(user.userPassword);

                setSaveData(user.userName);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveData = async () => {
        try {
            await AsyncStorage.removeItem("userData")
            setName("");
            setEmail("");
            setPassword("");
            setSaveData("");
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleGetData()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
            <Text style={{ fontSize: 22, fontWeight: "bold" }}>AsyncStorage Demo Class</Text>
            <TextInput placeholder="Enter Name.." value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 20, padding: 15 }} />
            <TextInput placeholder="Enter Email.." value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 20, padding: 15 }} />
            <TextInput placeholder="Enter Password.." value={password} onChangeText={setPassword} style={{ borderWidth: 1, marginBottom: 20, padding: 15 }} />
            <View style={{ height: 20 }} />

            <Button title="Save Data" onPress={handleSaveData} />
            <View style={{ height: 20 }} />
            <Button title="Get Data" onPress={handleGetData} />
            
            <Text>Name: {name}</Text>
            <Text>Email: {email}</Text>
            <Text>Password: {password}</Text>

            <View style={{ height: 20 }} />
            <Button title="Delete Data" onPress={handleRemoveData} />
        </View>
    )
}
export default AsyncStorageScreen