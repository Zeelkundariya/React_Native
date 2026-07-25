import {Alert, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageExample = () => {
  const [name, setName] = useState("");
  const [savedData, setSavedData] = useState("");

  const handleSaveData = async () => {
    if(!name.trim()){
      Alert.alert("Enter Data", "Please enter something to save");
      return;
    }

    try{
      await AsyncStorage.setItem("username", name);

      setSavedData(name);
      setName("");

      Alert.alert("Saved", "Data saved successfully");
    }
    catch(err){
      console.log(err);

      Alert.alert("Error", "Failed to save data");
    }
  };

  const handleGetData = async () => {
    try{
      const value = await AsyncStorage.getItem("username");

      if(value !== null){
        setSavedData(value);

        Alert.alert("Success", "Data retrieved successfully");
      }
      else{
        Alert.alert("No Data", "No saved data found");
      }
    }
    catch(err){
      console.log(err);

      Alert.alert("Error", "Failed to get data");
    }
  };

  const handleClearData = async () => {
    try{
      await AsyncStorage.removeItem("username");

      setSavedData("");

      Alert.alert("Cleared", "Data cleared successfully");
    }
    catch(err){
      console.log(err);

      Alert.alert("Error", "Failed to clear data");
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>

        <Text style={styles.title}>AsyncStorage Demo</Text>

        <Text style={styles.subtitle}>
          Save and retrieve data locally
        </Text>

        <Text style={styles.label}>Enter Data</Text>

        <TextInput
          placeholder="Enter Something..."
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Pressable
          style={styles.saveButton}
          onPress={handleSaveData}
        >
          <Text style={styles.saveButtonText}>
            Save Data
          </Text>
        </Pressable>

        <Pressable
          style={styles.getButton}
          onPress={handleGetData}
        >
          <Text style={styles.getButtonText}>
            Get Data
          </Text>
        </Pressable>

        <Pressable
          style={styles.clearButton}
          onPress={handleClearData}
        >
          <Text style={styles.clearButtonText}>
            Clear Data
          </Text>
        </Pressable>

        {savedData !== "" && (
          <View style={styles.savedBox}>

            <Text style={styles.savedTitle}>
              Saved Data
            </Text>

            <Text style={styles.savedText}>
              {savedData}
            </Text>

          </View>
        )}

      </View>

    </View>
  );
};

export default AsyncStorageExample;

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    paddingHorizontal:22,
    backgroundColor:"#f4f6f8"
  },

  card:{
    backgroundColor:"#ffffff",
    padding:25,
    borderRadius:20,
    shadowColor:"#000",
    shadowOffset:{
      width:0,
      height:4
    },
    shadowOpacity:0.1,
    shadowRadius:10,
    elevation:5
  },

  title:{
    fontSize:28,
    fontWeight:"bold",
    color:"#222",
    textAlign:"center"
  },

  subtitle:{
    fontSize:15,
    color:"#777",
    textAlign:"center",
    marginTop:8,
    marginBottom:30
  },

  label:{
    fontSize:15,
    fontWeight:"600",
    color:"#333",
    marginBottom:8
  },

  input:{
    width:"100%",
    height:52,
    borderWidth:1,
    borderColor:"#d5d5d5",
    borderRadius:12,
    paddingHorizontal:15,
    backgroundColor:"#fafafa",
    fontSize:16,
    color:"#222",
    marginBottom:20
  },

  saveButton:{
    height:52,
    backgroundColor:"#1677ff",
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center"
  },

  saveButtonText:{
    color:"#ffffff",
    fontSize:16,
    fontWeight:"bold"
  },

  getButton:{
    height:52,
    borderWidth:1.5,
    borderColor:"#1677ff",
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
    marginTop:12
  },

  getButtonText:{
    color:"#1677ff",
    fontSize:16,
    fontWeight:"bold"
  },

  clearButton:{
    height:52,
    borderWidth:1.5,
    borderColor:"#e53935",
    borderRadius:12,
    justifyContent:"center",
    alignItems:"center",
    marginTop:12
  },

  clearButtonText:{
    color:"#e53935",
    fontSize:16,
    fontWeight:"bold"
  },

  savedBox:{
    backgroundColor:"#f4f8ff",
    borderWidth:1,
    borderColor:"#d9e8ff",
    borderRadius:12,
    padding:16,
    marginTop:20
  },

  savedTitle:{
    fontSize:14,
    fontWeight:"600",
    color:"#777",
    marginBottom:6
  },

  savedText:{
    fontSize:18,
    fontWeight:"bold",
    color:"#222"
  }
});