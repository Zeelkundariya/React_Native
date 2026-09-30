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