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




// import {
//     View,
//     FlatList,
//     Text,
//     Button,
//     TextInput
// } from "react-native";

// import { useState } from "react";

// export default function FetchScreen() {
//     const [data, setData] = useState([]);
//     const [search, setSearch] = useState("")

//     const fetchData = async () => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => setData(data));
//     };


//     const filteredData = data.filter((item) => (
//         item.title.toLowerCase().includes(search.toLowerCase)
//     ))
//     return (
//         <View>
//             <Button
//                 title="Fetch Data"
//                 onPress={fetchData}
//             />

//             <FlatList
//                 data={filteredData}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                     <View>
//                         <TextInput
//                             placeholder="search"
//                             value={search}
//                             onChangeText={setSearch} />
//                         <Text>{item.title}</Text>
//                     </View>
//                 )}
//             />
//         </View>
//     );
// }



// import { View, TextInput, Button } from "react-native";
// export default function FormScreen() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async () => {
//         if (name.trim() === "") {
//             console.log("Name is required")
//         }

//         if (email.trim() === "") {
//             console.log("Email is required")
//         }

//         if(!email.includes("@")){
//             console.log("Email should be in correct format")
//         }

//         if (password.trim() === "") {
//             console.log("Password is required")
//         }


//         if(!password.length < 6){
//             console.log("Password should be less  not be less than 6")
//         }
//     }
//     return (
//         <View>
//             <TextInput placeholder="Name" value={name} onChangeText={setName} />
//             <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
//             <TextInput placeholder="Password" value={password} onChangeText={setPassword} />

//             <Button title="Submit" onPress={handleSubmit} />
//         </View>
//     )
// }






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















/*********************************************************************************************************/


//simple counter with disabled 

// import { useState } from "react";
// import { Button, View } from "react-native";

// export default function CounterScreen() {
//     const [count, setCount] = useState(0)
//     return (
//         <View>
//             <Button title="+" onPress={()=>setCount(count+1)} />
//             <Button  title="-" onPress={()=>setCount(count-1)} disabled={count === 0}/>
//             <Button title="Reset" onPress={()=>setCount(0)}/>
//         </View>
//     )
// }




//simple form validation

// import { useState } from "react";
// import { Button, TextInput, View } from "react-native";

// export default function FormScreen() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");


//     const handleSubmit = () => {
//         if(name.trim() === ""){
//             console.log("Name is required")
//         };

//         if(email.trim() === ""){
//             console.log("Email is required")
//         }
//         if(password.trim() ===""){
//             console.log("Password is required")
//         }

//     }
//     return (
//         <View>

//             <TextInput placeholder="Name" value={name} onChangeText={setName}/>
//             <TextInput keyboardType="email-address" placeholder="Email" value={email} onChangeText={setEmail}/>
//             <TextInput secureTextEntry placeholder="Password" value={password} onChangeText={setPassword}/>
//             <Button title="Submit" onPress={handleSubmit} />
//         </View>
//     )
// }




//simple fetching the data using flatlist

// import { useState } from "react";
// import { Button, FlatList, View , Image} from "react-native";

// export default function FetchScreen() {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => setData(data))
//     }

//     return (
//         <View>
//             <FlatList 
//             data={data}
//             keyExtractor={((item)=>item.id.toString())}
//             renderItem={({item})=>(
//                 <View>
//                     <Image source = {{uri:item.image}} style={{width: 100,height: 100}}/>
//                     <Text>{item.title}</Text>
//                     </View>
//             )}/>

//             <Button title="fetch data" onPress={fetchData}/>
//         </View>
//     )
// }





// with search filtering


// import { useState } from "react";
// import { Button, FlatList, TextInput, View } from "react-native";

// export default function FetchScreen() {
//     const [data, setData] = useState([]);
//     const [search, setSearch] = useState("");

//     const filteredData = data.filter((item)=>(
//         item.title.toLowerCase().includes(search.toLowerCase())
//     ))

//     const fetchData = async () => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => setData(data))
//     }


//     return (
//         <View>
//             <FlatList
//                 data={filteredData}
//                 keyExtractor={((item) => item.id.toString())}
//                 renderItem={({ item }) => (
//                     <View>
//                         <Text>{item.title}</Text>
//                     </View>
//                 )}
//             />
//             <TextInput placeholder="search" value={search}onChangeText={setSearch} />
//             <Button title="Fetch Data" onPress={fetchData} />
//         </View>
//     )
// }







// hide password on toggle


// import { useState } from "react";
// import { Button, TextInput, View } from "react-native";

// export default function FormScreen() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [hidePassword, setHidePassword] = useState(false);


//     const handleSubmit = () => {
//         if (name.trim() === "") {
//             console.log("Name is required")
//         };

//         if (email.trim() === "") {
//             console.log("Email is required")
//         }
//         if (password.trim() === "") {
//             console.log("Password is required")
//         }

//     }
//     return (
//         <View>

//             <TextInput placeholder="Name" value={name} onChangeText={setName} />
//             <TextInput keyboardType="email-address" placeholder="Email" value={email} onChangeText={setEmail} />
//             <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={hidePassword}
//             />
//             <Button title={hidePassword ? "show Password" : "hide Password"}
//                 onPress={setHidePassword(!hidePassword)} />
//             <Button title="Submit" onPress={handleSubmit} />
//         </View>
//     )
// }




// with loading api is fetching

// import { useState } from "react";
// import { Button, FlatList, View , Image} from "react-native";

// export default function FetchScreen() {
//     const [data, setData] = useState([]);

//     const fetchData = async () => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => setData(data))
//     }

//     return (
//         <View>
//             <FlatList 
//             data={data}
//             keyExtractor={((item)=>item.id.toString())}
//             renderItem={({item})=>(
//                 <View>
//                     <Image source = {{uri:item.image}} style={{width: 100,height: 100}}/>
//                     <Text>{item.title}</Text>
//                     </View>
//             )}/>

//             <Button title="fetch data" onPress={fetchData}/>
//         </View>
//     )
// }



// import { useState } from "react";
// import { Button, FlatList, TextInput, View } from "react-native";

// export default function FetchScreen() {
//     const [data, setData] = useState([]);
//     const [search, setSearch] = useState("")
//     const [loading, setLoading] = useState(false)

//     const fetchData = async () => {
//         try {
//             setLoading(true)
//          const response = await fetch("https://fakestoreapi.com/products")
//          const result = await response.json();
//          setData(result)
//                 // .then((res) => res.json())
//                 // .then((data) => setData(data))

//         }
//         catch (error) {
//             console.log("Something went wrong")
//         }
//         finally {
//             setLoading(false)
//         }
//     }


//     const filteredData = data.filter((item) => (
//         item.title.toLowerCase().includes(search.toLowerCase())
//     ));

//     return (
//         <View>

//             {loading && <Text>Loading...</Text>}
//             <FlatList
//                 data={filteredData}
//                 keyExtractor={((item) => item.id.toString())}
//                 renderItem={({ item } = (
//                     <View>
//                         <Text>{item.title}</Text>
//                         <Image source={{ uri: item.image }} />
//                     </View>
//                 ))} />


//             <TextInput placeholder="search" value={search} onChangeText={setSearch} />


//             <Button title="Get Data" onPress={fetchData} />
//         </View>
//     )
// }




//  left to do this


// import { useState } from "react";
// import {
//     View,
//     Text,
//     Button,
//     FlatList,
//     Image,
//     TextInput
// } from "react-native";

// export default function ProductSearchFilter() {
//     const [data, setData] = useState([]);
//     const [search, setSearch] = useState("");
//     const [filter, setFilter] = useState("all");

//     const fetchData = async () => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => setData(data));
//     };

//     const filteredData = data.filter((item) => {

//         const searchMatch = item.title
//             .toLowerCase()
//             .includes(search.toLowerCase());

//         let priceMatch = true;

//         if (filter === "under") {
//             priceMatch = item.price < 50;
//         }

//         if (filter === "above") {
//             priceMatch = item.price > 50;
//         }

//         return searchMatch && priceMatch;
//     });

//     return (
//         <View>

//             <TextInput
//                 placeholder="Search products..."
//                 value={search}
//                 onChangeText={setSearch}
//             />

//             <Button
//                 title="Fetch Products"
//                 onPress={fetchData}
//             />

//             <Button
//                 title="All"
//                 onPress={() => setFilter("all")}
//             />

//             <Button
//                 title="Under $50"
//                 onPress={() => setFilter("under")}
//             />

//             <Button
//                 title="Above $50"
//                 onPress={() => setFilter("above")}
//             />

//             <FlatList
//                 data={filteredData}
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

//                         <Text>${item.price}</Text>

//                     </View>
//                 )}
//             />

//         </View>
//     );
// }





// import { useState, useEffect } from "react";

// import {
//     Button,
//     FlatList,
//     View,
//     Image,
//     Text,
//     TextInput
// } from "react-native";

// export default function FetchScreen() {
//     const [data, setData] = useState([]);
//     const [search, setSearch] = useState("");
//     const [debouncedSearch, setDebouncedSearch] = useState("");

//     const fetchData = async () => {
//         fetch("https://fakestoreapi.com/products")
//             .then((res) => res.json())
//             .then((data) => setData(data));
//     };

//     // Debounce
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setDebouncedSearch(search);
//         }, 500);

//         return () => {
//             clearTimeout(timer);
//         };
//     }, [search]);

//     const filteredData = data.filter((item) =>
//         item.title
//             .toLowerCase()
//             .includes(debouncedSearch.toLowerCase())
//     );

//     return (
//         <View>

//             <TextInput
//                 placeholder="Search products..."
//                 value={search}
//                 onChangeText={setSearch}
//             />

//             <Button
//                 title="Fetch Data"
//                 onPress={fetchData}
//             />

//             <FlatList
//                 data={filteredData}
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

//                         <Text>
//                             {item.title}
//                         </Text>

//                     </View>
//                 )}
//             />

//         </View>
//     );
// }




import React, { useEffect, useState } from "react";
import { Button, FlatList, TextInput, View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function FetchScreen() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://fakestoreapi.com/products");
            const result = await res.json();
            setData(result);
        } catch (err) {
            console.log("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [search]);

    const filteredData = data.filter((item) =>
        item.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Product Search</Text>
            <TextInput
                style={styles.input}
                placeholder="Search products..."
                value={search}
                onChangeText={setSearch}
            />
            <Button title="Fetch Products" onPress={fetchData} />

            {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 15 }} />}

            <FlatList
                data={filteredData}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
                        <View style={styles.cardDetails}>
                            <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                            <Text style={styles.productPrice}>${item.price}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 50,
        backgroundColor: "#fff",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    listContent: {
        paddingVertical: 12,
    },
    card: {
        flexDirection: "row",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
        alignItems: "center",
    },
    image: {
        width: 60,
        height: 60,
        marginRight: 12,
    },
    cardDetails: {
        flex: 1,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: "#333",
    },
    productPrice: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#2e7d32",
        marginTop: 4,
    },
});