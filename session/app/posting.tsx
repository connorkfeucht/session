import { Text, View, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import styles from "./styles";

export default function Posting() {
    const { setsCompleted } = useLocalSearchParams();
    // TODO: Create UI for this page, add ability to insert images, add caption, location, productivity scale.
    return (
    <View style={styles.container}>
        <Text style={{fontFamily: 'PlayfairDisplay' }}>You completed {setsCompleted} sets this seshn!</Text>
    </View>
    );
}