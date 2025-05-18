import { 
  Text, 
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator, 
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import styles from "../styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";


type ProfileRow = {
  id: string,
  username: string, // TODO: in supabase this is currently nullable, need to change
  full_name: string | null,
  avatar_url: string | null;
  bio: string | null;
  seshns_completed: number;
}

type ActivitiesRow = {
  aid: number,
  title: string,
  created_at: string,
  description: string,
  is_private: boolean,
  sets_completed: number,
  location: string,
  images: string[],
}

// DUMMY DATA UNTIL HOOKED UP TO DB
// TODO: FETCH REAL ACTIVITES AND STORE THEM IN STATE
// const ACTIVITIES = Array.from({ length: 6 }).map((_, i) => ({
//   id: String(i),
//   uri: `https://via.placeholder.com/120?text=${i + 1}`, 
// }));


export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [activities, setActivities] = useState<ActivitiesRow[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        // get the session to find the user id
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const userId = session?.user.id;
        if (!userId) throw new Error("No user session");

        // query profiles table for that id
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url, bio, seshns_completed")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        const { data: activitiesData, error: activitiesError } = await supabase
          .from("activities")
          .select("aid, title, created_at, description, is_private, sets_completed, location, images")
          .eq("uid", userId);

        if (activitiesError) throw activitiesError;
        setActivities(activitiesData);

      } catch(error: any) {
        console.error("Error loading profile/activites:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out: ", error.message);
    } else {
      // drop back to the root index
      router.replace("/");
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.container}>
        <Text style={styles.statsText}>Profile Not Found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image source={{uri: profile.avatar_url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"}} style={styles.avatar}/>
        <View style={styles.profileInfo}>
          <View style={{...styles.row, marginBottom: 0}}>
            <Text style={styles.username}>@{profile.username.toLowerCase()}</Text>
            <TouchableOpacity onPress={() => router.push({pathname: "../friends"})}><FontAwesome name="users" size={24}/></TouchableOpacity>
          </View>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Text style={styles.statsText}>{profile.seshns_completed} Completed Seshns</Text>
        </View>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push({pathname: "../activities"})}>
          <Text style={styles.buttonText}>See Activities</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}