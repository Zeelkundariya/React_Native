// Create a timer that:
// Starts from 0
// Start → starts counting
// Stop → stops counting
// Reset → sets timer back to 0
// Display the timer on the screen


// import { useEffect, useState } from "react";
// import { Button, View } from "react-native";

// export default function TimerScreen() {
//     const [running, setRunnung] = useState(false);
//     const [time, setTime] = useState(0);

//     useEffect(()=>{
//         let timer;

//         if(running){
//             timer = setInterval(()=>{
//                 settime((prev)=>prev+1)
//             },1000);
//         }
//         return()=>{
//             clearInterval(timer)
//         }
//     },[running])


//     return (
//         <View>
//             <Text>Time:{time}</Text>
//             <Button title="Start" onPress={() => { setRunnung(true) }} />
//             <Button title="Stop" onPress={() => { setRunnung(false) }} />
//             <Button title="Reset" onPress={() => { setRunnung(false) }} />
//         </View>
//     )
// }






// Create a countdown timer starting from 60 seconds.
// Start
// Pause
// Reset
// When it reaches 0, automatically stop.
// It should display 60, 59, 58... 0.



// import { useEffect, useState } from "react";
// import { Button, View } from "react-native";

// export default function TimerScreen() {
//     const [running, setRunnung] = useState(false);
//     const [time, setTime] = useState(60);

//     useEffect(() => {
//         let timer;

//         if (running && timer >0) {
//             timer = setInterval(() => {
//                 setTime((prev) => prev - 1)
//             }, 1000)
//         }

//         if(time === 0){
//             setRunnung(false)
//         }

//         const handleReset = ()=>{
//             setRunnung(false);
//             setTime(60);
//         }
//         return () => {
//             clearInterval(timer)
//         }
//     }, [running], [time])

//     return (
//         <View>
//             <Text>Time:{time}</Text>
//             <Button title="Start" onPress={() => setRunnung(true)} />
//             <Button title="Stop" onPress={() => { setRunnung(false) }} />
//             <Button title="Reset" onPress={handleReset} />
//         </View>
//     )
// }



// import { useEffect, useState } from "react"
// import { Button, View } from "react-native"

// export default function TimerScreen() {
//     const [running, setRunning] = useState(false);
//     const [time, setTime] = useState(0);

//     useEffect(()=>{
//         let timer;

//         if(running){
//             timer = setInterval(()=>{
//                 setTime((prev)=>prev+1)
//             },1000)
//         }
//         return()=>{
//             clearInterval(timer)
//         }
//     },[running])
//     return (
//         <View>
//             <Text>Time:{time}</Text>
//             <Button title="Start" onPress={() => setRunning(true)} />
//             <Button title="Stop" onPress={() => setRunning(false)} />
//             <Button title="Reset" onPress={() => setRunning(false)} />
//         </View>
//     )
// }





// import { useEffect, useState } from "react";
// import { Button, View } from "react-native";

// export default function StopWatch() {
//     const [running, setRunning] = useState(false);
//     const [time, setTime] = useState(60);

//     useEffect(() => {
//         let timer;

//         if (running && timer > 0) {
//             timer = setInterval(() => {
//                 setTime((prev) => prev + 1)
//             }, 1000)
//         }
//         if (time === 0) {
//             setRunning(false)
//         }

//         const handleReset = () => {
//             setRunning(false);
//             setTime(60)
//         }

//         return () => {
//             clearInterval(timer)
//         }
//     }, [running],[time])

//     return (
//         <View>
//             <Button title="Start" onPress={() => setRunning(true)} />
//             <Button title="Stop" onPress={() => setRunning(false)} />
//             <Button title="Reset" onPress={handleReset} />
//         </View>
//     )
// }


import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function TimerCountScreen() {
    const [time, setTime] = useState(10);
    const [running, setRunning] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        let timer;

        if (running && time > 0) {
            timer = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }

        if (time === 0) {
            setRunning(false);
        }

        return () => {
            clearInterval(timer);
        };
    }, [running, time]);

    const startTimer = () => {
        setRunning(true);
    };

    const pressButton = () => {
        if (running) {
            setCount((prevCount) => prevCount + 1);
        }
    };

    const resetTimer = () => {
        setTime(10);
        setCount(0);
        setRunning(false);
    };

    return (
        <View>

            <Text>Time: {time}</Text>

            <Button
                title="Start"
                onPress={startTimer}
            />

            <Button
                title="PRESS"
                onPress={pressButton}
                disabled={!running}
            />

            <Text>Total Presses: {count}</Text>

            <Button
                title="Reset"
                onPress={resetTimer}
            />

        </View>
    );
}


