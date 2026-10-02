// import {
//     View,
//     FlatList,
//     Text,
//     Image,
//     Button
// } from "react-native";

// import { useState } from "react";

// export default function FetchScreen() {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => setData(data));
//     };

//     return (
//         <View>
//             <Button
//                 title="Fetch Data"
//                 onPress={fetchData}
//             />

//             <FlatList
//                 data={data}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Image
//                             source={{ uri: item.image }}
//                             style={{
//                                 width: 100,
//                                 height: 100
//                             }}
//                         />

//                         <Text>{item.title}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }




import {
    View,
    FlatList,
    Text,
    Button,
    TextInput
} from "react-native";

import { useState } from "react";

export default function FetchScreen() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("")

    const fetchData = async () => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setData(data));
    };


    const filteredData = data.filter((item) => (
        item.title.toLowerCase().includes(search.toLowerCase)
    ))
    return (
        <View>
            <Button
                title="Fetch Data"
                onPress={fetchData}
            />

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <TextInput
                            placeholder="search"
                            value={search}
                            onChangeText={setSearch} />
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
}



import { View, TextInput, Button } from "react-native";
export default function FormScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (name.trim() === "") {
            console.log("Name is required")
        }

        if (email.trim() === "") {
            console.log("Email is required")
        }

        if(!email.includes("@")){
            console.log("Email should be in correct format")
        }

        if (password.trim() === "") {
            console.log("Password is required")
        }


        if(!password.length < 6){
            console.log("Password should be less  not be less than 6")
        }
    }
    return (
        <View>
            <TextInput placeholder="Name" value={name} onChangeText={setName} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    )
}






// import { Button, View } from "react-native";
// import { useState } from "react";

// export default function Counter() {
//     const [count, setCount] = useState(0);
//     return (
//         <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "grey" }}>
//             <Button title="+" onPress={() => setCount(count + 1)} />
//             <Button title="-" onPress={() => setCount(count - 1)} disabled={count === 0} />
//             <Button title="0" onPress={() => setCount(0)} />
//         </View>
//     )
// }