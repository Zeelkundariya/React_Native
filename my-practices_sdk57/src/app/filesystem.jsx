// import { StyleSheet, Text, View, Button } from 'react-native'
// import React from 'react'
// import { Paths, File, Directory } from "expo-file-system";

// const fileSystem = () => {

//     const handleFileSystem = () => {
//         console.log(Paths.document);

//         const imagesFolder = new Directory(Paths.document, "thumbnail");
//         console.log(imagesFolder);

//         imagesFolder.create({idempotent:true});

//         const profileImage = new File(imagesFolder, "thumbnail.png");

//         console.log(profileImage.uri);

//         // profileImage.create({idempotent:true});

//         // console.log(profileImage.exists);
//         // console.log(profileImage);

//         console.log("Available Disk Spaces :- ", Paths.availableDiskSpace);
//         console.log("Total Disk Space:- ", Paths.totalDiskSpace);
//     }

//     const handleDirectoryPath = () => {
//         console.log(Paths.document);

//         const collegeDirectory = new Directory(Paths.document,"notes","college");

//         collegeDirectory.create({intermediates:true});

//         console.log(collegeDirectory);
//     }


//     return (
//         <View style={styles.container}>
//             <Text style={styles.title}>fileSystem</Text>
//             <View style={{ height: 20 }} />
//             <Button title="Get File Path" onPress={handleFileSystem} />
//             <View style={{height:20}} />
//             <Button title="Directory Path" onPress={handleDirectoryPath} />
//             <View style={{height:20}} />
//             <Button title="create subdirectory with createDirectory" onPress={handleDirectoryPath} />
//         </View>
//     )
// }

// export default fileSystem

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F4F6F9",
//         justifyContent: "center",
//         paddingHorizontal: 25,
//     },
//     title: {
//         fontSize: 28,
//         fontWeight: "bold",
//         textAlign: "center",
//         color: "#2563EB",
//         marginBottom: 8,
//     },
// })




import { Button, StyleSheet, View } from "react-native";
import { Paths, File } from "expo-file-system";

export default function FileSystemScreen() {
    const handlefilesystem = async () => {
        const fileData = new File(Paths.document, "notes.txt");

        if (!fileData.exists) {
            fileData.create();
        }

        const student = {
            name: "Zeel",
            age: 19,
            course: "React-Native"
        }

        const jsonData = JSON.stringify(student);
        fileData.write(jsonData)

        fileData.write(jsonData)

        const res = await fileData.text();
        const data = JSON.parse(res);

        console.log("Name:", data.name);
        console.log("Age:", data.age);
        console.log("Course:", data.course);
    }


    return (
        <View style={style.container}>
            <Button title="File Data" onPress={handlefilesystem} />
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "grey"
    }
})


import { StyleSheet, Text, View, Button } from 'react-native'
import { Paths, Directory, File } from "expo-file-system";

export default function file_system() {
  async function a() {
    console.log(Paths.document);
    console.log(Paths.availableDiskSpace);
    console.log(Paths.totalDiskSpace);

    const imagesFolder = new Directory(Paths.document, "nitish kumar");
    console.log(imagesFolder);

    imagesFolder.create({
      idempotent : true
    });
    console.log(" imagesFolder created");
    const profileImage = new File(imagesFolder , "profile.jpg");
    console.log(profileImage.exists);

    const fileData = new File(Paths.document , "notes.json");

    const student = {
      name : "asc",
      age : 29,
      course : "react"
    }

    
    const jsonData = JSON.stringify(student);

    fileData.write(jsonData);

    const res = await fileData.text();
    console.log(res)

    // fileData.write("ljdvjh");
    // const res = await fileData.text();
    const data = JSON.parse(res);

    console.log(data);
    console.log(typeof(data));

  }
  return (
    <View style={{ flex: 1 }}>
      <Text>file_system</Text>
      <Button title='Click' onPress={a} />
    </View>
  )
}

const styles = StyleSheet.create({})








import{View,Button,Text} from "react-native"
import {Paths,Directory} from "expo-file-system";
export default function app(){
const handlePaths=()=>{
    console.log(Paths.Document);
    const imageFolder=new Directory(Paths.Document,"images")
    imageFolder.create();
    console.log(imageFolder);

    const availableGB=Paths.availableDiskSpace/1024/1024;
    console.log(available.toFixed(2));

};



    return(
        <View>
        <Text>file system</Text>
        <Button title="path" onPress={handlePaths}/>
        </View>
    )
}