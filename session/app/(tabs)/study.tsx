import { Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function Study() {
    const [timer, setTimer] = useState(60*25); // initial countdown value (60 seconds)
    const [isRunning, setIsRunning] = useState(false); // tracks if the timer is running
    const [isWorkPhase, setIsWorkPhase] = useState(true);
    const [setsCompleted, setSetsCompleted] = useState(0);

    // TODO: Need to do UI Polishing
    // TODO: Need to have section that starts a study session before timer shows up
    // TODO: Need to save statistics for a study session 

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isRunning && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 0.00001); // decrease timer by 1 every second
        } else if (isRunning && timer === 0) {
            clearInterval(interval); // clear interval when timer reaches 0
            
            if (isWorkPhase) { // if timer is 0 and just finished work phase
                setSetsCompleted((prevSets) => prevSets + 1);
                setTimer(60*5);
                setIsWorkPhase(false);
            } else { // end the break
                setTimer(60*25);
                setIsWorkPhase(true);
            }
        }

        return () => {
            if (interval) clearInterval(interval); // cleanup interval on unmount
        };

    }, [isRunning, timer, isWorkPhase]);

    const handleToggleTimer = () => {
        if (isRunning) {
            setIsRunning(false); // stop timer
            setTimer(isWorkPhase ? 60*25 : 60*5); // reset timer
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
                        fontFamily: "SpaceMono",
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
            <Text style={{fontFamily: "PlayfairDisplay", marginTop: 20 }}>Number of sets completed: {setsCompleted}</Text>
        </View>
    );
}