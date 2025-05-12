import { Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import styles from "./styles";

export default function Posting() {
    const router = useRouter();
    const { setsCompleted } = useLocalSearchParams();
    const [posting, setPosting] = useState(false);

    // useEffect(() => {
        
    // }, []);

    const handlePostSeshn = () => {
        // TODO: create activity in supabase
        // TODO: post activity to home.tsx
        router.push({
            pathname: "/1-home"
        });
    }
    // TODO: Create UI for this page, add ability to insert images, add caption, location, productivity scale.
    return (
    <View style={styles.container}>
        <Text style={styles.statsText}>You completed {setsCompleted} sets this seshn!</Text>
        <TouchableOpacity style={styles.button} onPress={handlePostSeshn}>
            <Text style={styles.buttonText}>FINISH</Text>
        </TouchableOpacity>
    </View>

    );
}