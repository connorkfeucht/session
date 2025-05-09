import { 
  Text, 
  View,
  Image,
  FlatList,
  TouchableOpacity, 
} from "react-native";
import styles from "../styles";

// DUMMY USER INFO
// TODO: FETCH REAL USER INFO AND STORE IN STATE
const USER = {
  username: "johndoe",
  bio: "crushing pomodoros since 2003",
  seshnsCompleted: 50,
}

// DUMMY DATA UNTIL HOOKED UP TO DB
// TODO: FETCH REAL ACTIVITES AND STORE THEM IN STATE
const ACTIVITIES = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i),
  uri: `https://via.placeholder.com/120?text=${i + 1}`, 
}));


export default function Profile() {
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{uri: "https://avatars.githubusercontent.com/u/132318582?v=4"}} style={styles.avatar}/>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>@{USER.username}</Text>
          <Text style={styles.bio}>{USER.bio}</Text>
          <Text style={styles.statsText}>{USER.seshnsCompleted} Completed Seshns</Text>
        </View>
      </View>
    
    <FlatList
      data={ACTIVITIES}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={styles.activityRow}
      contentContainerStyle={{paddingBottom: 20}}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item.uri }}
          style={styles.activityThumb}
        />
      )}
    />

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>All Activities</Text>
    </TouchableOpacity>

    </View>
  );
}