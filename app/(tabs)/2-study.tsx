import { Text, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import styles from "../styles";
import { useRouter } from "expo-router";

export default function Study() {
    const router = useRouter();
    const WORK_DURATION = 25 * 60;
    const BREAK_DURATION = 5 * 60;

    const [timer, setTimer] = useState(WORK_DURATION); 
    const [isRunning, setIsRunning] = useState(false);
    const [isWorkPhase, setIsWorkPhase] = useState(true);
    const [setsCompleted, setSetsCompleted] = useState(0);

    // TODO: Need to have section that starts a study session before timer shows up

    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;

        if (isRunning && timer > 0) { // if the timer is running and should still run
            interval = setInterval(() => setTimer(t => t - 1), 1000);
        } else if (isRunning && timer === 0) { // if timer is running and needs to stop
            if (interval != undefined) clearInterval(interval); // clear interval when timer reaches 0
            
            if (isWorkPhase) { // if timer is 0 and just finished work phase
                setSetsCompleted((prevSets) => prevSets + 1);
                setTimer(BREAK_DURATION);
                setIsWorkPhase(false);
            } else { // end the break
                setTimer(WORK_DURATION);
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
            setTimer(isWorkPhase ? WORK_DURATION : BREAK_DURATION); // reset timer
        } else {
            setIsRunning(true); // start timer
        }
    }

    const handleEndSeshn = () => {
        setSetsCompleted(0); // reset setsCompleted
        router.replace({
            pathname: "../posting",
            params: { setsCompleted: `${setsCompleted}` },
        });
    }

    const totalTime = isWorkPhase ? WORK_DURATION : BREAK_DURATION;
    const progress = ((totalTime - timer) / totalTime) * 100;
    const minutes = String(Math.floor(timer / 60)).padStart(2, "0");
    const seconds = String(timer % 60).padStart(2, "0");

    return (
        <View style={styles.container}>
            <Text style={styles.phaseText}>
                {isWorkPhase ? "WORK PHASE" : "BREAK PHASE"}
            </Text>

            <Text style={styles.timerText}>
                {minutes}:{seconds}
            </Text>

            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleToggleTimer}>
                <Text style={styles.buttonText}>
                    {isRunning ? "STOP & RESET" : isWorkPhase ? "START WORK" : "START BREAK"}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleEndSeshn}>
                <Text style={styles.buttonText}>
                    END SESHN
                </Text>
            </TouchableOpacity>

            <Text style={styles.statsText}>
                Sets completed this seshn: {setsCompleted}
            </Text>
        </View>
    );
}

