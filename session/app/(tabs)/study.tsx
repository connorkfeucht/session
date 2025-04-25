import { Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function Study() {
    const [timer, setTimer] = useState(60 * 25); // initial countdown value (60 seconds)
    const [isRunning, setIsRunning] = useState(false); // tracks if the timer is running
    // TODO: Currently only counts down to 00:00. need to save number of completed countdowns, and
    // TODO: flip flop between 25:00 and 5:00 countdowns.
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000); // decrease timer by 1 every second
        } else if (!isRunning && interval) {
            clearInterval(interval); // clear interval when stopped
        }

        return () => {
            if (interval) clearInterval(interval);
        };

    }, [isRunning, timer]);

    const handleToggleTimer = () => {
        if (isRunning) {
            setIsRunning(false); // stop timer
            setTimer(60 * 25); // reset timer
        } else {
            setIsRunning(true); // start timer
        }
    }

    return (
        <View
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <View
                style={{
                    width: 250,
                    height: 250,
                    borderRadius: 125,
                    backgroundColor: "orange",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: "PlayfairDisplay",
                        fontSize: 64,
                        color: "white",
                    }}
                >
                    {Math.floor(timer / 60)
                        .toString()
                        .padStart(2, "0")}:
                    {(timer % 60).toString().padStart(2, "0")}
                </Text>
            </View>
            <TouchableOpacity onPress={handleToggleTimer}>
                <Text
                    style={{
                        fontFamily: "PlayfairDisplay",
                        padding: 10,
                        fontSize: 18,
                    }}
                >
                    {isRunning ? "Stop & Reset" : "Start Studying"}
                </Text>
            </TouchableOpacity>
            <Text style={{fontFamily: "PlayfairDisplay" }}>Number of sets completed: 0</Text>
        </View>
    );
}