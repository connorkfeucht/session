import { Text, View, ActivityIndicator, ScrollView, Image, TouchableOpacity, } from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import FontAwesome from "@expo/vector-icons/FontAwesome";


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

export default function Activities() {
  // TODO: Add Images and other data about the activity.
  // TODO: implement delete seshn function
  // TODO: Add functionality to turn seshns public and private
  const [activities, setActivities] = useState<ActivitiesRow[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        // get the current session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const userId = session?.user.id;
        if (!userId) throw new Error("No user session");
        
        // getting activities from supabase
        const { data: activitiesData, error: activitiesError } = await supabase
          .from("activities")
          .select("aid, title, created_at, description, is_private, sets_completed, location, images")
          .eq("uid", userId);

        if (activitiesError) throw activitiesError;
        setActivities(activitiesData);
      } catch(error: any) {
        console.error("Error loading activites:", error.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  })

  const handleDeleteSeshn = () => {
    // TODO: delete activity from supabase after confirming that you want to delete it
  }

  if (loading) { // if activities are still loading
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  if (activities === null) { // no activites
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
          {/* meta row: sets + duration */}
          <View style={{...styles.metaRow, marginBottom: 5}}>
            <Text style={styles.activityTitle}>{act.title}</Text>
            <TouchableOpacity onPress={handleDeleteSeshn}><FontAwesome name="trash" size={24} color="#111"/></TouchableOpacity>
          </View>
          <Text style={styles.activityDesc}>{act.description}</Text>
          <Text style={styles.metaItem}>{act.sets_completed} sets</Text>
          {/* TODO: ADD IMAGES */}

        </View>
      ))}
    </ScrollView>
  );
}