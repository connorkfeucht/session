import { 
  Text, 
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator, 
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import styles from "../styles";

type ProfileRow = {
  id: string,
  username: string, // TODO: in supabase this is currently nullable, need to change
  full_name: string | null,
  avatar_url: string | null;
  bio: string | null;
  seshns_completed: number;
}

// DUMMY DATA UNTIL HOOKED UP TO DB
// TODO: FETCH REAL ACTIVITES AND STORE THEM IN STATE
const ACTIVITIES = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i),
  uri: `https://via.placeholder.com/120?text=${i + 1}`, 
}));


export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
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
        const { data, error } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url, bio, seshns_completed")
          .eq("id", userId)
          .single();

        if (error) throw error;
        setProfile(data);

      } catch(error: any) {
        console.error("Error loading profile:", error.message);
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
          <Text style={styles.username}>@{profile.username.toLowerCase()}</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
          <Text style={styles.statsText}>{profile.seshns_completed} Completed Seshns</Text>
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

    <TouchableOpacity style={styles.button} onPress={handleSignOut}>
      <Text style={styles.buttonText}>Sign out</Text>
    </TouchableOpacity>

    </View>
  );
}