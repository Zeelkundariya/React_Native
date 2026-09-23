import { Button, View } from "react-native"
import { useEffect, useState } from "react"

export default function FetchScreen() {
    const [data, setData] = useState(null);

    const fetchdata = async () => {
        const response = await fetch("");
        const result = await response.json();

        setData(result);
    }

    useEffect(()=>{fetchData()},[]);
    return (
        <View>
            <Text>{data?.value}</Text>
        </View>
    )
}