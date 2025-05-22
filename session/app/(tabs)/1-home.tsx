import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import styles from "../styles";
import { supabase } from "../../lib/supabase";


type ActivityItem = {
  aid: string;
  username: string;
  uid: string;
  avatar_url: string | null;
  title: string;
  description: string;
  sets: number;
  duration: string;
  mood: number;
  productivity: number;
  images: string[];
};

const DUMMY_ACTIVITIES: ActivityItem[] = [
  {
    aid: "1",
    username: "johndoe",
    avatar_url: null,
    title: "Deep Work Sprint",
    description: "Knocked out the data model schema 🚀",
    sets: 3,
    duration: "1h 15m",
    mood: 8,
    productivity: 9,
    images: ["https://via.placeholder.com/300"],
  },
  {
    aid: "2",
    username: "janedoe",
    avatar_url: null,
    title: "Reading Time",
    description: "Digging into research on UX patterns.",
    sets: 2,
    duration: "50m",
    mood: 7,
    productivity: 8,
    images: [],
  },
  {
    aid: "3",
    username: "connorkfeucht",
    avatar_url: null,
    title: "Working on app",
    description: "Testing Testing 1 2 3! Working on the UI for my home.tsx page. Soon I'm going to replace this placeholder with real data from supabase!!!!",
    sets: 4,
    duration: "1h",
    mood: 10,
    productivity: 10,
    images: [],
  },
];

export default function Home() {
  const [activities, setActivities] = useState<ActivityItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState()
  // TODO: Mood and Productivity sliders
  // TODO: Order the activities by newest
  // TODO: write function for like button. hook up to backend
  // TODO: Add Images

  useEffect(() => {
    const loadFeed = async () => {
      try {
        // TODO: Put in real data, data is displayed if friends and is_private = false
        // username, uid, and avatar_url for each ActivityItem is from profiles
        // the rest is from activities, with mood and productivity being null for now.


      } catch (error: any) {

      } finally {
        setLoading(false);
      }
    } 
  }, [])

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  if (activities === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.statsText}> There are currently no activities to be displayed. </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: "#fff",}} contentContainerStyle={{
      justifyContent: "center",
      alignItems: "center", }}>
      {activities.map((act) => (
        <View key={act.aid} style={styles.activityCard}>
          {/* header: avatar + username */}
          <View style={styles.cardHeader}>
            <Image
              source={{ uri: act.avatar_url || "https://via.placeholder.com/40/cccccc?text=U", }} style={styles.avatarSmall}/>
            <Text style={styles.username}>{act.username}</Text>
            {/* like button */}
            <TouchableOpacity style={styles.likeButton}>
              <Ionicons name="heart-outline" size={24} color="#111" />
            </TouchableOpacity>
          </View>

          {/* title */}
          <Text style={styles.activityTitle}>{act.title}</Text>

          {/* description */}
          <Text style={styles.activityDesc}>{act.description}</Text>

          {/* meta row: sets + duration */}
          <View style={styles.metaRow}>
            <Text style={styles.metaItem}>{act.sets} sets</Text>
            <Text style={styles.metaItem}>{act.duration}</Text>
          </View>

          {/* mood slider */}
          <View style={styles.sliderRow}>
            <Text style={styles.statsText}>Mood </Text>
            <Text style={styles.statsText}>{act.mood}/10</Text>
          </View>

          {/* productivity slider */}
          <View style={styles.sliderRow}>
            <Text style={styles.statsText}>Productivity </Text>

            <Text style={styles.statsText}>{act.productivity}/10</Text>
          </View>

          {/* TODO: ADD IMAGES */}

        </View>
      ))}
    </ScrollView>
  );
}


