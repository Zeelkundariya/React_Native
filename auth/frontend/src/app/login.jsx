import {View , Text  , Button , Pressable, TextInput} from "react-native";
import { useState } from "react";
import {router} from "expo-router";
export default function loginUser(){
    const[name , setName] = useState("")
    const[password , setPassword] = useState("")
    const handleRegister = async()=>{
        //  const obj1 ={
        //     name : name ,
        //     password : password
        //  }
        //  console.log( "Checking",obj1);
         
        const response = await fetch("http://localhost:3000/api/login" , 
            {
            method : "POST" ,
            headers : { "Content-Type" : "application/json"},
            body :JSON.stringify({ name : name , password : password})
         }
        )
        
        const data = await response.json();
        console.log(data);

        if(data.success){
            router.replace("/")
        }
        else if(!data.success){
             return(
            <View style ={{flex : 1 , justifyContent : "center" , alignItems : "center"}}>
            <Text style ={{color : "red"}}>Register Failed : {data.msg}</Text>
            <TextInput placeholder="Enter name" value={name} onChangeText={setName} />
            <TextInput placeholder="Enter password" value={password} onChangeText={setPassword} />
            <Pressable onPress={handleRegister}>
            <Text>Register as User</Text>
            </Pressable>
        </View>
            )
        }
    }
    return (
        <View style ={{flex : 1 , justifyContent : "center" , alignItems : "center"}}>
            <TextInput placeholder="Enter name" value={name} onChangeText={setName} />
            <TextInput placeholder="Enter password" value={password} onChangeText={setPassword} />
            <Pressable onPress={handleRegister}>
                <Text>Login as User</Text>
            </Pressable>
        </View>
    )
}