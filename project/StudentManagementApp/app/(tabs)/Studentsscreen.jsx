import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';

const student = () => {
    const [name,setName] = useState("");
    const students = [
  {
    id: "1",
    name: "Aarav Patel",
    age: 19,
    gender: "Male",
    course: "Computer Engineering",
    semester: 1,
    city: "Ahmedabad",
    email: "aarav.patel@example.com",
    phone: "9876543210",
  },
  {
    id: "2",
    name: "Diya Shah",
    age: 18,
    gender: "Female",
    course: "Information Technology",
    semester: 2,
    city: "Surat",
    email: "diya.shah@example.com",
    phone: "9876543211",
  },
  {
    id: "3",
    name: "Vivaan Mehta",
    age: 20,
    gender: "Male",
    course: "Mechanical Engineering",
    semester: 3,
    city: "Vadodara",
    email: "vivaan.mehta@example.com",
    phone: "9876543212",
  },
  {
    id: "4",
    name: "Ananya Desai",
    age: 19,
    gender: "Female",
    course: "Civil Engineering",
    semester: 4,
    city: "Rajkot",
    email: "ananya.desai@example.com",
    phone: "9876543213",
  },
  {
    id: "5",
    name: "Krish Joshi",
    age: 21,
    gender: "Male",
    course: "Electronics Engineering",
    semester: 5,
    city: "Bhavnagar",
    email: "krish.joshi@example.com",
    phone: "9876543214",
  },
  {
    id: "6",
    name: "Riya Trivedi",
    age: 20,
    gender: "Female",
    course: "Computer Engineering",
    semester: 6,
    city: "Gandhinagar",
    email: "riya.trivedi@example.com",
    phone: "9876543215",
  },
  {
    id: "7",
    name: "Yash Chauhan",
    age: 22,
    gender: "Male",
    course: "Electrical Engineering",
    semester: 7,
    city: "Anand",
    email: "yash.chauhan@example.com",
    phone: "9876543216",
  },
  {
    id: "8",
    name: "Mahi Parmar",
    age: 18,
    gender: "Female",
    course: "Computer Science",
    semester: 1,
    city: "Jamnagar",
    email: "mahi.parmar@example.com",
    phone: "9876543217",
  },
  {
    id: "9",
    name: "Harsh Vyas",
    age: 21,
    gender: "Male",
    course: "Artificial Intelligence",
    semester: 5,
    city: "Mehsana",
    email: "harsh.vyas@example.com",
    phone: "9876543218",
  },
  {
    id: "10",
    name: "Khushi Rana",
    age: 19,
    gender: "Female",
    course: "Data Science",
    semester: 2,
    city: "Patan",
    email: "khushi.rana@example.com",
    phone: "9876543219",
  },
  {
    id: "11",
    name: "Dev Bhatt",
    age: 20,
    gender: "Male",
    course: "Cyber Security",
    semester: 4,
    city: "Morbi",
    email: "dev.bhatt@example.com",
    phone: "9876543220",
  },
  {
    id: "12",
    name: "Sneha Modi",
    age: 22,
    gender: "Female",
    course: "Computer Engineering",
    semester: 8,
    city: "Junagadh",
    email: "sneha.modi@example.com",
    phone: "9876543221",
  },
  {
    id: "13",
    name: "Raj Solanki",
    age: 21,
    gender: "Male",
    course: "Software Engineering",
    semester: 6,
    city: "Nadiad",
    email: "raj.solanki@example.com",
    phone: "9876543222",
  },
  {
    id: "14",
    name: "Priya Gohil",
    age: 18,
    gender: "Female",
    course: "Computer Science",
    semester: 1,
    city: "Valsad",
    email: "priya.gohil@example.com",
    phone: "9876543223",
  },
  {
    id: "15",
    name: "Om Pandya",
    age: 23,
    gender: "Male",
    course: "Information Technology",
    semester: 8,
    city: "Navsari",
    email: "om.pandya@example.com",
    phone: "9876543224",
  },
];

  return (
    <ScrollView>
        <View style={{backgroundColor:"#fff",flex:1,justifyContent:"center",alignItems:"center"}}>
        <View style={{padding:20,fontSize:30,borderColor:"black",borderWidth:2,width:500}}>{name}</View>
       <Text>Students Data</Text>
       <FlatList 
       data={students}
       keyExtractor={(item)=>item.id}
       scrollEnabled={false}
       renderItem={({item})=>(
        <View style={{padding:20}}>
            <Text>{item.name}</Text>
            <Text>{item.course}</Text>
            <Text>{item.email}</Text>
            <Pressable onPress={()=>setName(item.name)} style={{padding:10,backgroundColor:"#237ea9",color:"white",fontSize:20,fontFamily:"sans-serif"}}>Select</Pressable>
        </View>
       )}
       />
    </View>
    </ScrollView>
  )
}

export default student

const styles = StyleSheet.create({})