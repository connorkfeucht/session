import { 
  Text, 
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator, 
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import styles from "../styles";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import getCurrentUserId from "../utils/authUtils";


type ProfileRow = {
  id: string,
  username: string,
  full_name: string | null,
  avatar_url: string | null;
  bio: string | null;
  seshns_completed: number;
}

export default function Profile() {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileRow | null>(null);
  // const [activities, setActivities] = useState<ActivitiesRow[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const userId = await getCurrentUserId();
      try {
        // query profiles table for that id
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("id, username, full_name, avatar_url, bio, seshns_completed")
          .eq("id", userId)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

      } catch(error: any) {
        console.error("Error loading profile/activites:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  const handleEditBio = () => {
    Alert.prompt(
      "Edit Bio",
      "Enter a new bio:",
      [
        {text: "Cancel", style: "cancel"},
        {text: "Save", onPress: async (text) => {
          const newBio = (text ?? "").trim() // if text is null then replaces with empty string and trims

          setLoading(true);
          const { error } = await supabase
            .from("profiles")
            .update({bio: newBio})
            .eq("id", profile!.id)
          setLoading(false);

          if (error) {
            Alert.alert("Error updating Bio:", error.message)
          } else {
            setProfile((p) => (p ? { ...p, bio: newBio } : p))
            Alert.alert("Bio successfully updated.")
          }
        }}
      ],
      "plain-text",
      profile?.bio ?? ""
    )
  }

  const handleEditUsername = () => { // pop up when user presses on their username to change it
    Alert.prompt( // iOS pop up
      "Edit Username",
      "Enter a new username:",
      [
        {text: "Cancel", style: "cancel"},
        {
          text: "Save", onPress: async (text) => {
            if (!text?.trim()) {
              Alert.alert("Username cannot be empty")
              return
            }
            setLoading(true)
            const { error } = await supabase // sets the new username
              .from("profiles")
              .update({username: text.trim()})
              .eq("id", profile!.id)
            setLoading(false)

            if (error) {
              Alert.alert("Error updating username: ", error.message)
            } else {
              setProfile((p) => (p ? { ...p, username: text.trim() } : p))
              Alert.alert("Username successfully updated!")
            }
          }
        }

      ],
      "plain-text",
      profile?.username
    )
  }

  const handleSignOut = async () => { // handles when the user presses Sign Out button
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out: ", error.message);
    } else {
      // drop back to the root index
      router.replace("/");
    }
  }

  if (loading) { // if profile is still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  if (!profile) { // if there was an error getting the users profile
    return (
      <View style={styles.container}>
        <Text style={styles.statsText}>Profile Not Found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{...styles.profileHeader, borderWidth: 0}}>
        <Image source={{uri: profile.avatar_url || "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg?20200418092106"}} style={styles.avatar}/>
        <View style={styles.profileInfo}>
          <View style={{...styles.row, marginBottom: 0}}>
            <Text style={styles.username} onPress={handleEditUsername}>@{profile.username.toLowerCase()}</Text>
            <TouchableOpacity onPress={() => router.push({pathname: "../friends"})}><FontAwesome name="users" size={24}/></TouchableOpacity>
          </View>
          <Text style={styles.bio} onPress={handleEditBio}>{profile.bio}</Text>
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