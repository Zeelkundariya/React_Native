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
//             setTime(0)
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



import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function StopWatch() {
    const [running, setRunning] = useState(false);
    const [time, setTime] = useState(60);

    useEffect(() => {
        let timer;

        // Fixed: Check 'time > 0' instead of 'timer > 0'
        if (running && time > 0) {
            timer = setInterval(() => {
                setTime((prev) => prev - 1); // Countdown from 60
            }, 1000);
        }
        
        if (time === 0) {
            setRunning(false);
        }

        return () => {
            clearInterval(timer);
        };
    }, [running, time]); // Fixed: Single dependency array containing both values

    // Fixed: Moved handleReset outside of useEffect so the Button can access it
    const handleReset = () => {
        setRunning(false);
        setTime(60); // Reset back to initial 60 seconds
    };

    return (
        <View style={styles.container}>
            {/* Timer Display */}
            <Text style={styles.timerText}>{time}s</Text>

            {/* Controls Row */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.button, running ? styles.disabledButton : styles.startButton]} 
                    onPress={() => setRunning(true)}
                    disabled={running || time === 0}
                >
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, !running ? styles.disabledButton : styles.stopButton]} 
                    onPress={() => setRunning(false)}
                    disabled={!running}
                >
                    <Text style={styles.buttonText}>Stop</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.resetButton]} 
                    onPress={handleReset}
                >
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// React Native Styles (Equivalent to CSS)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    timerText: {
        fontSize: 72,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        fontVariant: ['tabular-nums'], // Prevents layout jittering as numbers change
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: 320,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        marginHorizontal: 5,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    startButton: {
        backgroundColor: '#4CD964', // Green
    },
    stopButton: {
        backgroundColor: '#FF3B30', // Red
    },
    resetButton: {
        backgroundColor: '#007AFF', // Blue
    },
    disabledButton: {
        backgroundColor: '#A8A8A8', // Greyed out when inactive
        opacity: 0.6,
    }
});
