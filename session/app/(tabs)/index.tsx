import { Text, View } from "react-native";

// TODO: Show self and other's study seshns that they've posted. 
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{fontFamily: 'PlayfairDisplay' }}>Looks empty! Add friends to see their study seshns here.</Text>
    </View>
  );
}
