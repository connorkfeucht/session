import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "./styles";

export default function Posting() {
    const { setsCompleted } = useLocalSearchParams();

    return (
    <View
        style={styles.container}
    >
        <Text style={{fontFamily: 'PlayfairDisplay' }}>You completed {setsCompleted} sets this seshn!</Text>
    </View>
    );
}