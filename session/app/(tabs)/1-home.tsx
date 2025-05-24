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

// for putting together the whole post
type ActivityItem = { // "***" == not implemented yet
  aid: string; // activities
  username: string | null; // profiles
  uid: string; // activities
  avatar_url: string | null; // profiles
  title: string; // activities
  description: string; // activities
  sets: number; // activities
  duration: string | null; // calculate
  mood: number | null; // activities***
  productivity: number | null; // activities***
  images: string[] | null; // activities***
};

// for getting activity row from DB
type DBActivityRow = {
  aid: number;
  uid: string;
  title: string;
  description: string;
  sets_completed: number;
  created_at: string;
  location: string;
};

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

        const { data: activitiesData, error: activitiesError } = await supabase
          .from("activities")
          .select("aid, uid, title, description, sets_completed, created_at, location")
          .eq("is_private", false)

        if (activitiesError) throw activitiesError;

        const items: ActivityItem[] = await Promise.all(
          (activitiesData || []).map(async (r) => {
            const { data: profileData, error: profileError } = await supabase
              .from("profiles")
              .select("username, avatar_url")
              .eq("id", r.uid)
              .single()

            if (profileError) throw profileError;

            return {
              aid: r.aid.toString(),
              uid: r.uid,
              username: profileData?.username || "unknown",
              avatar_url: profileData?.avatar_url || null,
              title: r.title,
              description: r.description,
              sets: r.sets_completed,
              duration: null,        // TODO: fill in these values
              mood: null,
              productivity: null,
              images: null,
            };
          })
        );

        setActivities(items);

      } catch (error: any) {
        console.error("Error loading profile/activites:", error.message);
        setActivities([]);
        setLoading(false);
        return;
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
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


