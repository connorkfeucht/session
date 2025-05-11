import { Text, View } from "react-native";
import styles from "../styles";

// TODO: Show self and other's study seshns that they've posted. 
// TODO: use flatlist for scrolling through posts
export default function Home() {
  return (
    <View style={styles.container} >
      <Text style={styles.statsText}>Looks empty! Add friends to see their study seshns here.</Text>
    </View>
  );
}

